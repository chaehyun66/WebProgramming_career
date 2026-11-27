(() => {
  // 마이페이지와 동일한 날짜 계산 및 찜 저장 방식.
  function toKey(date) {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return date.getFullYear() + '-' + m + '-' + d;
  }
  const todayKey = toKey(new Date());
  function daysLeft(deadline) {
    return Math.round((new Date(deadline) - new Date(todayKey)) / 86400000);
  }
  function dday(deadline) {
    const diff = daysLeft(deadline);
    if (diff > 0) return 'D-' + diff;
    if (diff === 0) return '오늘 마감';
    return '마감';
  }
  function loadLikedIds() {
    const saved = localStorage.getItem('likedIds');
    if (saved === null) {
      const initial = ['recruit-003', 'activity-global', 'contest-hana'];
      localStorage.setItem('likedIds', JSON.stringify(initial));
      return initial;
    }
    try { const ids = JSON.parse(saved); return Array.isArray(ids) ? ids : []; }
    catch { return []; }
  }
  function toggleLike(id) {
    let ids = loadLikedIds();
    if (ids.includes(id)) ids = ids.filter(x => x !== id);
    else ids.push(id);
    localStorage.setItem('likedIds', JSON.stringify(ids));
  }
  function element(tag, className, text) {
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = text || '';
    return el;
  }
  const grid = document.querySelector('.contest-grid');
  if (!grid) return;
  const type = location.pathname.toLowerCase().includes('activity') ? '대외활동' : '공모전';
  const originalCards = Array.from(grid.querySelectorAll('.contest-card'));
  const format = date => date.slice(5).replace('-', '.');
  const sort = document.querySelector('.contest-toolbar select');
  const categories = Array.from(document.querySelectorAll('.contest-categories a'));
  const pagination = document.querySelector('.pagination');
  const sidebar = document.querySelector('.contest-sidebar');
  const reset = element('button', 'filter-reset', '필터 초기화');
  reset.type = 'button';
  const closed = document.createElement('input');
  closed.type = 'checkbox';
  // 기본은 마감 공고도 표시. 필요할 때 체크하여 제외.
  const closedLabel = element('label', 'closed-filter');
  closedLabel.append(closed, ' 마감된 공고 제외');
  sidebar.append(reset, closedLabel);
  let category = '전체', currentPage = 1;
  const pageSize = 3;
  let cards = [];
  let ready = false;
  function syncLikes() {
    const ids = loadLikedIds();
    cards.forEach(({ card, item }) => {
      card.querySelector('.heart-check').checked = ids.includes(item.id);
    });
  }
  function render() {
    if (!ready) return;
    const results = cards.filter(({ item }) =>
      (category === '전체' || item.field === category) &&
      (!closed.checked || daysLeft(item.deadline) >= 0)
    );
    results.sort((a, b) => {
      if (sort.selectedIndex === 1) return b.item.start.localeCompare(a.item.start);
      if (sort.selectedIndex === 2) {
        const expiredA = daysLeft(a.item.deadline) < 0;
        const expiredB = daysLeft(b.item.deadline) < 0;
        return Number(expiredA) - Number(expiredB) || a.item.deadline.localeCompare(b.item.deadline);
      }
      return Number(!!b.item.recommended) - Number(!!a.item.recommended);
    });
    const pageCount = Math.max(1, Math.ceil(results.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    grid.replaceChildren(...results.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(x => x.card));
    if (!results.length) grid.append(element('p', 'empty-message', '조건에 맞는 공고가 없습니다.'));
    document.getElementById('contest-list-title').replaceChildren(
      document.createTextNode(category + ' ' + type + ' '), element('span', '', String(results.length))
    );
    categories.forEach(a => {
      const active = a.textContent.trim() === category;
      a.classList.toggle('selected', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    pagination.replaceChildren();
    function pageButton(label, target, disabled, active = false) {
      const button = element('button', 'page-button' + (active ? ' current-page' : ''), label);
      button.type = 'button';
      button.disabled = disabled;
      if (active) button.setAttribute('aria-current', 'page');
      button.addEventListener('click', () => { currentPage = target; render(); });
      pagination.append(button);
    }
    pageButton('‹', currentPage - 1, currentPage === 1);
    for (let i = 1; i <= pageCount; i++) pageButton(String(i), i, false, i === currentPage);
    pageButton('›', currentPage + 1, currentPage === pageCount);
    syncLikes();
  }
  categories.forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); category = a.textContent.trim(); currentPage = 1; render();
  }));
  sort.addEventListener('change', () => { currentPage = 1; render(); });
  closed.addEventListener('change', () => { currentPage = 1; render(); });
  reset.addEventListener('click', () => {
    category = '전체'; sort.selectedIndex = 0; closed.checked = false; currentPage = 1; render();
  });
  document.querySelector('.editor-pick-link')?.addEventListener('click', e => {
    if (!ready) return;
    e.preventDefault();
    category = '전체'; sort.selectedIndex = 0; closed.checked = false; currentPage = 1; render();
    cards.find(x => x.item.recommended)?.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  fetch('8_29SM_contest_activity.json', {cache:'no-store'})
    .then(response => {
      if (!response.ok) throw new Error('JSON load failed');
      return response.json();
    })
    .then(data => {
      cards = originalCards.map(card => {
        const thumb = card.querySelector('img').getAttribute('src');
        const item = data.likes.find(x => x.category === type && x.thumb === thumb);
        if (!item) throw new Error('Missing post: ' + thumb);
        card.dataset.id = item.id;
        card.querySelector('.contest-card-bottom strong').textContent = format(item.start) + '~' + format(item.deadline);
        const badge = element('span', 'D-day live-dday', dday(item.deadline));
        if (daysLeft(item.deadline) < 0) badge.classList.add('expired');
        if (daysLeft(item.deadline) === 0) badge.classList.add('urgent');
        card.querySelector('.contest-card-bottom').append(badge);
        const checkbox = card.querySelector('.heart-check');
        Favorites.bind(checkbox, item.id);
        return { card, item };
      });
      ready = true;
      render();
    })
    .catch(error => {
      console.error(error);
      grid.prepend(element('p','empty-message','공고 데이터를 불러오지 못했습니다. Live Server로 열어주세요.'));
    });
  window.addEventListener('pageshow', syncLikes);
  window.addEventListener('storage', e => { if (e.key === 'likedIds' || e.key === null) syncLikes(); });
})();
