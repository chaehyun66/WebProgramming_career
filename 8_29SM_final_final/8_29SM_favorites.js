// 모든 공고 페이지에서 같은 ID 배열을 공유합니다.
window.Favorites = (() => {
  const key = 'likedIds';
  function read() {
    try {
      const value = localStorage.getItem(key);
      if (value === null) {
        const initial = ['recruit-003', 'activity-global', 'contest-hana'];
        localStorage.setItem(key, JSON.stringify(initial));
        return initial;
      }
      const ids = JSON.parse(value);
      return Array.isArray(ids) ? [...new Set(ids)] : [];
    } catch { return []; }
  }
  function set(id, active) {
    const ids = new Set(read());
    if (active) ids.add(id); else ids.delete(id);
    localStorage.setItem(key, JSON.stringify([...ids]));
    sync();
  }
  function sync() {
    const ids = read();
    document.querySelectorAll('[data-favorite-id]').forEach(el => {
      const active = ids.includes(el.dataset.favoriteId);
      if (el.tagName === 'INPUT') el.checked = active;
      else {
        el.textContent = active ? '♥' : '♡';
        el.setAttribute('aria-pressed', String(active));
      }
    });
  }
  function bind(el, id) {
    el.dataset.favoriteId = id;
    const input = el.tagName === 'INPUT';
    const active = read().includes(id);
    if (input) el.checked = active;
    else { el.textContent = active ? '♥' : '♡'; el.setAttribute('aria-pressed', String(active)); }
    el.addEventListener(input ? 'change' : 'click', () => set(id, input ? el.checked : !read().includes(id)));
  }
  function daysLeft(deadline) {
    const now = new Date();
    return Math.round((Date.parse(deadline) - Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())) / 86400000);
  }
  function dday(deadline) {
    const left = daysLeft(deadline);
    return left > 0 ? 'D-' + left : left === 0 ? '오늘 마감' : '마감';
  }
  window.addEventListener('pageshow', sync);
  window.addEventListener('storage', e => { if (e.key === key || e.key === null) sync(); });
  return {read, set, bind, sync, daysLeft, dday};
})();
