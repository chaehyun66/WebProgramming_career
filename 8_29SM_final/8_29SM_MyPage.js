function load(key, fallback) {
  const saved = localStorage.getItem(key);
  if (saved === null) {
    return fallback;
  }
  return JSON.parse(saved);
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toKey(date) {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return date.getFullYear() + '-' + m + '-' + d;
}

function daysLeft(deadline) {
  return Math.round((new Date(deadline) - new Date(todayKey)) / 86400000);
}

function dday(deadline) {
  const diff = daysLeft(deadline);
  if (diff > 0) return 'D-' + diff;
  if (diff === 0) return '오늘 마감';
  return '마감';
}

function findParent(el, attr) {
  while (el !== null && el !== document) {
    if (el.getAttribute(attr) !== null) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
}

const today = new Date();
const todayKey = toKey(today);

let likes = [];
let likedIds = load('likedIds', null);
let applied = load('appliedList', null);
let events = load('myEvents', []);

const TYPE_CLASS = {
  '마감': 'deadline',
  '면접': 'interview',
  '시험': 'exam',
  '스터디': 'study',
  '기타': 'etc'
};

const likeList = document.getElementById('like-list');

function likedItems() {
  return likes.filter(item => likedIds.includes(item.id));
}
let favoriteCategory = '전체';
const favoriteTabs = document.querySelectorAll('[data-favorite-category]');
favoriteTabs.forEach(button => button.addEventListener('click', () => {
  favoriteCategory = button.dataset.favoriteCategory;
  renderLikes();
}));

function isApplied(id) {
  return applied.some(a => a.id === id);
}

function checkedIds() {
  const ids = [];
  const checks = likeList.querySelectorAll('.item-check');
  for (const c of checks) {
    if (c.checked) {
      ids.push(findParent(c, 'data-id').getAttribute('data-id'));
    }
  }
  return ids;
}

function renderLikes() {
  const unchecked = [];
  const checks = likeList.querySelectorAll('.item-check');
  for (const c of checks) {
    if (!c.checked) {
      unchecked.push(findParent(c, 'data-id').getAttribute('data-id'));
    }
  }

  likeList.innerHTML = '';
  const allItems = likedItems();
  const items = allItems.filter(item => favoriteCategory === '전체' || item.category === favoriteCategory);
  document.getElementById('favorite-total').textContent = allItems.length;
  favoriteTabs.forEach(button => {
    const name = button.dataset.favoriteCategory;
    const count = allItems.filter(item => name === '전체' || item.category === name).length;
    button.textContent = name + ' ' + count;
    button.classList.toggle('active', favoriteCategory === name);
  });

  if (items.length === 0) {
    likeList.innerHTML =
      '<div class="empty-cart">' +
        '<p class="empty-title">' + (favoriteCategory === '전체' ? '찜한 공고가 없어요' : favoriteCategory + ' 찜 목록이 비어 있어요') + '</p>' +
        '<p class="empty-desc">관심 있는 공고의 ♡를 눌러 담아 두면, 마감일을 달력에서 함께 챙길 수 있어요.</p>' +
        '<div class="empty-links">' +
          '<a href="8_29SM_contest.html">공모전 보기</a>' +
          '<a href="8_29SM_activity.html">대외활동 보기</a>' +
          '<a href="8_29SM_recruit.html">채용공고 보기</a>' +
        '</div>' +
      '</div>';
  }

  for (const item of items) {
    let checked = ' checked';
    if (unchecked.includes(item.id)) {
      checked = '';
    }

    const article = document.createElement('article');
    article.className = 'cart-item';
    article.setAttribute('data-id', item.id);
    article.innerHTML =
      '<input type="checkbox" class="item-check" data-action="check"' + checked + '>' +
      '<img class="thumb ' + item.thumbClass + '" src="' + item.thumb + '" alt="' + item.company + '">' +
      '<div class="info">' +
        '<p class="brand">' + item.category + ' · ' + item.company + '</p>' +
        '<h3 class="name">' + item.title + '</h3>' +
        '<p class="option">' + item.option + '</p>' +
      '</div>' +
      '<p class="D-day">' + dday(item.deadline) + '</p>' +
      '<button type="button" class="btn-smorder" data-action="apply">지원하기</button>' +
      '<button type="button" class="btn-delete" data-action="delete" title="삭제">✕</button>';

    likeList.appendChild(article);
  }

  updateSelectCount();
  updateSummary();
}

likeList.addEventListener('click', (e) => {
  const article = findParent(e.target, 'data-id');
  if (article === null) return;
  const id = article.getAttribute('data-id');
  const action = e.target.getAttribute('data-action');

  if (action === 'apply') {
    const item = likes.find(l => l.id === id);
    applyTo(item);
    saveApplied();
    renderLikes();
    refreshCalendar();
    showApplied();
  }

  if (action === 'delete') {
    likedIds = likedIds.filter(x => x !== id);
    save('likedIds', likedIds);
    renderLikes();
    refreshCalendar();
  }

  if (action === 'check') {
    updateSelectCount();
    updateSummary();
  }
});

const selectAll = document.getElementById('select-all');
selectAll.addEventListener('change', () => {
  const checks = likeList.querySelectorAll('.item-check');
  for (const c of checks) {
    c.checked = selectAll.checked;
  }
  updateSelectCount();
  updateSummary();
});

document.getElementById('delete-selected').addEventListener('click', () => {
  const ids = checkedIds();
  if (ids.length === 0) return;

  likedIds = likedIds.filter(id => !ids.includes(id));
  save('likedIds', likedIds);
  renderLikes();
  refreshCalendar();
});

document.getElementById('apply-selected').addEventListener('click', () => {
  const ids = checkedIds();
  const targets = likes.filter(l => ids.includes(l.id));

  if (targets.length === 0) {
    if (likedIds.length === 0) {
      alert('찜한 공고가 없어요. 관심 있는 공고를 먼저 찜해 주세요.');
    } else {
      alert('지원할 공고를 목록에서 체크해 주세요.');
    }
    return;
  }
  if (!confirm("체크한 공고 " + targets.length + "건을 지원할까요?\n지원한 공고는 찜 목록에서 빠지고 '지원 완료한 공고'로 옮겨져요.")) return;

  for (const item of targets) {
    applyTo(item);
  }
  saveApplied();
  renderLikes();
  refreshCalendar();
  showApplied();
});

function updateSelectCount() {
  const all = likeList.querySelectorAll('.item-check').length;
  const checked = checkedIds().length;
  document.getElementById('select-count').innerText = '전체선택 (' + checked + '/' + all + ')';
  selectAll.checked = all > 0 && checked === all;
}

function updateSummary() {
  const ids = checkedIds();
  const selected = likes.filter(l => ids.includes(l.id));
  const left = selected.map(l => daysLeft(l.deadline)).filter(n => n >= 0);

  document.getElementById('sum-count').innerText = selected.length + '건';
  document.getElementById('sum-week').innerText = left.filter(n => n <= 7).length + '건';
  if (left.length > 0) {
    document.getElementById('sum-first').innerText = Math.min(...left) === 0 ? '오늘 마감' : 'D-' + Math.min(...left);
  } else {
    document.getElementById('sum-first').innerText = '-';
  }
}

const appliedList = document.getElementById('applied-list');
const appliedTabs = document.querySelectorAll('.applied-tabs button');
let currentFilter = 'all';

const STEPS = ['지원', '서류', '면접', '결과'];
const STAGE_LABEL = ['지원 완료', '서류 심사 중', '면접 예정', '결과 대기'];

function applyTo(item) {
  likedIds = likedIds.filter(x => x !== item.id);
  save('likedIds', likedIds);

  if (isApplied(item.id)) return;

  let thumbClass = item.thumbClass;

  applied.unshift({
    id: item.id,
    cate: item.category + ' · ' + item.company,
    title: item.title,
    date: '지원일 ' + todayKey.replaceAll('-', '.') + ' · 마감 ' + item.deadline.replaceAll('-', '.'),
    thumb: item.thumb,
    thumbClass: thumbClass,
    alt: item.company,
    stage: 0,
    result: 'ing'
  });
}

function saveApplied() {
  save('appliedList', applied);
}

function showApplied() {
  currentFilter = 'all';
  renderApplied();
  document.querySelector('.applied').scrollIntoView({ behavior: 'smooth' });
}

function statusOf(a) {
  if (a.result === 'pass') return { label: '최종 합격', cls: 'status-black' };
  if (a.result === 'fail') return { label: '불합격', cls: 'status-gray' };
  if (a.stage === 2) return { label: STAGE_LABEL[a.stage], cls: 'status-blue' };
  return { label: STAGE_LABEL[a.stage], cls: 'status-line' };
}

function stepClass(a, i) {
  if (a.result === 'pass') return 'done';
  if (a.result === 'fail') {
    if (i <= a.stage) return 'done';
    return '';
  }
  if (i < a.stage) return 'done';
  if (i === a.stage) return 'current';
  return '';
}

function renderApplied() {
  appliedList.innerHTML = '';

  if (applied.length === 0) {
    appliedList.innerHTML = '<p class="empty">아직 지원한 공고가 없어요.</p>';
  }

  for (const a of applied) {
    for (let i = 0; i < likes.length; i++) {
      if (
        likes[i].id === a.id &&
        likes[i].category === '취업공고'
      ) {
        a.thumb = likes[i].thumb;
        a.thumbClass = likes[i].thumbClass;
        break;
      }
    }
    const st = statusOf(a);
    const article = document.createElement('article');
    article.className = 'applied-item';
    if (a.result === 'fail') {
      article.className = 'applied-item fail';
    }
    article.setAttribute('data-id', a.id);
    article.hidden = currentFilter !== 'all' && a.result !== currentFilter;

    let stepsHtml = '';
    for (let i = 0; i < STEPS.length; i++) {
      stepsHtml += '<li class="' + stepClass(a, i) + '" data-step="' + i + '" tabindex="0" role="button" title="' + STEPS[i] + ' 단계로 표시">' + STEPS[i] + '</li>';
    }

    article.innerHTML =
      '<img class="applied-thumb ' + a.thumbClass + '" src="' + a.thumb + '" alt="' + a.alt + '">' +
      '<div class="applied-info">' +
        '<p class="applied-cate">' + a.cate + '</p>' +
        '<h4 class="applied-name">' + a.title + '</h4>' +
        '<p class="applied-date">' + a.date + '</p>' +
      '</div>' +
      '<ol class="progress">' + stepsHtml + '</ol>' +
      '<button type="button" class="status ' + st.cls + '" data-action="status" title="눌러서 합격·불합격 표시">' + st.label + '</button>' +
      '<button type="button" class="btn-delete" data-action="cancel" title="지원 취소">✕</button>';

    appliedList.appendChild(article);
  }

  const count = {
    all: applied.length,
    ing: applied.filter(a => a.result === 'ing').length,
    pass: applied.filter(a => a.result === 'pass').length,
    fail: applied.filter(a => a.result === 'fail').length
  };
  const names = { all: '전체', ing: '진행 중', pass: '합격', fail: '불합격' };
  for (const tab of appliedTabs) {
    const f = tab.getAttribute('data-filter');
    tab.innerText = names[f] + ' ' + count[f];
    if (f === currentFilter) {
      tab.className = 'active';
    } else {
      tab.className = '';
    }
  }
}

for (const tab of appliedTabs) {
  tab.addEventListener('click', () => {
    currentFilter = tab.getAttribute('data-filter');
    renderApplied();
  });
}

appliedList.addEventListener('click', (e) => {
  const article = findParent(e.target, 'data-id');
  if (article === null) return;
  const a = applied.find(x => x.id === article.getAttribute('data-id'));
  const action = e.target.getAttribute('data-action');
  const step = e.target.getAttribute('data-step');

  if (action === 'cancel') {
    cancelApply(a);
    return;
  }

  if (step !== null) {
    a.stage = Number(step);
    a.result = 'ing';
  }

  if (action === 'status') {
    if (a.stage === 3) {
      const next = { ing: 'pass', pass: 'fail', fail: 'ing' };
      a.result = next[a.result];
    } else if (a.result === 'fail') {
      a.result = 'ing';
    } else {
      a.result = 'fail';
    }
  }

  if (step !== null || action === 'status') {
    saveApplied();
    renderApplied();
  }
});

function cancelApply(a) {
  const canReturn = likes.some(l => l.id === a.id);
  let message = "'" + a.title + "'을(를) 지원 목록에서 삭제할까요?";
  if (canReturn) {
    message = "'" + a.title + "' 지원을 취소하고 찜 목록으로 되돌릴까요?\n표시한 진행 상황은 사라져요.";
  }
  if (!confirm(message)) return;

  applied = applied.filter(x => x.id !== a.id);
  saveApplied();

  if (canReturn && !likedIds.includes(a.id)) {
    likedIds.push(a.id);
    save('likedIds', likedIds);
  }

  renderApplied();
  renderLikes();
  refreshCalendar();

  if (canReturn) {
    document.querySelector('.cart-list').scrollIntoView({ behavior: 'smooth' });
  }
}

appliedList.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute('data-step') !== null) {
    e.preventDefault();
    e.target.click();
  }
});

let viewYear = today.getFullYear();
let viewMonth = today.getMonth();
let selectedKey = todayKey;

const grid = document.getElementById('calendar-grid');
const form = document.getElementById('event-form');
const idInput = document.getElementById('event-id');
const titleInput = document.getElementById('event-title');
const dateInput = document.getElementById('event-date');
const typeInput = document.getElementById('event-type');
const memoInput = document.getElementById('event-memo');

function eventsOn(key) {
  const list = [];
  for (const l of likedItems()) {
    if (l.deadline === key) {
      list.push({ title: l.company + ' 마감', type: '마감', auto: true });
    }
  }
  return list.concat(events.filter(ev => ev.date === key));
}

function renderCalendar() {
  document.getElementById('month-label').innerText =
    viewYear + '.' + String(viewMonth + 1).padStart(2, '0');
  grid.innerHTML = '';

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('li');
    blank.className = 'blank';
    grid.appendChild(blank);
  }

  for (let d = 1; d <= lastDate; d++) {
    const key = toKey(new Date(viewYear, viewMonth, d));
    const list = eventsOn(key);

    let cls = 'day';
    if (key === todayKey) cls += ' today';
    if (key === selectedKey) cls += ' selected';
    if (list.length > 0) cls += ' has-event';

    const li = document.createElement('li');
    li.className = cls;
    li.setAttribute('data-date', key);

    const num = document.createElement('span');
    num.className = 'num';
    num.innerText = d;
    li.appendChild(num);

    for (const ev of list.slice(0, 2)) {
      const tag = document.createElement('span');
      tag.className = 'tag type-' + TYPE_CLASS[ev.type];
      tag.innerText = ev.title;
      li.appendChild(tag);
    }
    if (list.length > 2) {
      const more = document.createElement('span');
      more.className = 'more';
      more.innerText = '+' + (list.length - 2);
      li.appendChild(more);
    }

    grid.appendChild(li);
  }
}

function renderDayPanel() {
  const [, m, d] = selectedKey.split('-');
  document.getElementById('selected-label').innerText = Number(m) + '월 ' + Number(d) + '일 일정';

  const ul = document.getElementById('day-events');
  ul.innerHTML = '';
  const list = eventsOn(selectedKey);
  if (list.length === 0) {
    ul.innerHTML = '<li class="empty">등록된 일정이 없어요.</li>';
  }

  for (const ev of list) {
    const li = document.createElement('li');
    li.className = 'day-event';

    const tag = document.createElement('span');
    tag.className = 'tag type-' + TYPE_CLASS[ev.type];
    tag.innerText = ev.type;

    const title = document.createElement('strong');
    title.innerText = ev.title;
    li.append(tag, title);

    if (ev.memo) {
      const memo = document.createElement('p');
      memo.innerText = ev.memo;
      li.appendChild(memo);
    }

    if (!ev.auto) {
      li.insertAdjacentHTML('beforeend',
        '<div class="event-btns">' +
          '<button type="button" class="btn-line" data-edit="' + ev.id + '">수정</button>' +
          '<button type="button" class="btn-line" data-delete="' + ev.id + '">삭제</button>' +
        '</div>');
    }
    ul.appendChild(li);
  }

  if (!idInput.value) dateInput.value = selectedKey;
}

function refreshCalendar() {
  renderCalendar();
  renderDayPanel();
}

grid.addEventListener('click', (e) => {
  const day = findParent(e.target, 'data-date');
  if (day === null) return;
  selectedKey = day.getAttribute('data-date');
  refreshCalendar();
});

document.getElementById('prev-month').addEventListener('click', () => {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  renderCalendar();
});

document.getElementById('today-btn').addEventListener('click', () => {
  viewYear = today.getFullYear();
  viewMonth = today.getMonth();
  selectedKey = todayKey;
  refreshCalendar();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let id = idInput.value;
  if (id === '') {
    id = String(Date.now());
  }

  const data = {
    id: id,
    title: titleInput.value.trim(),
    date: dateInput.value,
    type: typeInput.value,
    memo: memoInput.value.trim()
  };

  if (idInput.value) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === data.id) {
        events[i] = data;
      }
    }
  } else {
    events.push(data);
  }
  save('myEvents', events);

  selectedKey = data.date;
  const [y, m] = data.date.split('-');
  viewYear = Number(y);
  viewMonth = Number(m) - 1;

  resetForm();
  refreshCalendar();
});

document.getElementById('day-events').addEventListener('click', (e) => {
  const editId = e.target.getAttribute('data-edit');
  const deleteId = e.target.getAttribute('data-delete');

  if (editId !== null) {
    const ev = events.find(x => x.id === editId);
    idInput.value = ev.id;
    titleInput.value = ev.title;
    dateInput.value = ev.date;
    typeInput.value = ev.type;
    memoInput.value = ev.memo;
    document.getElementById('event-submit').innerText = '수정 완료';
    document.getElementById('event-cancel').hidden = false;
    titleInput.focus();
  }

  if (deleteId !== null && confirm('이 일정을 삭제할까요?')) {
    events = events.filter(x => x.id !== deleteId);
    save('myEvents', events);
    resetForm();
    refreshCalendar();
  }
});

document.getElementById('event-cancel').addEventListener('click', resetForm);

function resetForm() {
  form.reset();
  idInput.value = '';
  dateInput.value = selectedKey;
  document.getElementById('event-submit').innerText = '일정 추가';
  document.getElementById('event-cancel').hidden = true;
}

document.getElementById('reset-data').addEventListener('click', () => {
  if (!confirm('마이페이지 데이터를 처음 상태로 되돌릴까요?\n찜 목록, 지원 목록, 내 일정이 모두 초기화돼요.')) return;

  localStorage.removeItem('likedIds');
  localStorage.removeItem('appliedList');
  localStorage.removeItem('myEvents');
  location.reload();
});

fetch('8_29SM_MyPage.json', { cache: 'no-store' })
  .then(res => res.json())
  .then(data => {
    likes = data.likes;

    if (likedIds === null) {
      likedIds = ['recruit-003', 'activity-global', 'contest-hana'];
      save('likedIds', likedIds);
    }
    if (applied === null) {
      applied = data.applied;
      saveApplied();
    }

    renderApplied();
    renderLikes();
    refreshCalendar();
  })
  .catch(() => {
    likeList.innerHTML = '<p class="empty">공고를 불러오지 못했어요. Live Server로 열어주세요.</p>';
    if (likedIds === null) likedIds = [];
    if (applied === null) applied = [];
    renderApplied();
    refreshCalendar();
  });

function refreshSavedFavorites() {
  if (!likes.length) return;
  likedIds = load('likedIds', []);
  if (!Array.isArray(likedIds)) likedIds = [];
  renderLikes();
  refreshCalendar();
}
window.addEventListener('pageshow', refreshSavedFavorites);
window.addEventListener('storage', e => {
  if (e.key === 'likedIds' || e.key === null) refreshSavedFavorites();
});
