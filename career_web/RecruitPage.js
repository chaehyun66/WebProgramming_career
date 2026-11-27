const LIKE_KEY = 'likedIds';
const THIS_ID = 'recruit-tesla';
const heart = document.getElementById('like-check');

let likedIds = JSON.parse(localStorage.getItem(LIKE_KEY)) || ['recruit-hyundai', 'activity-global', 'contest-hana'];
heart.checked = likedIds.includes(THIS_ID);

heart.addEventListener('change', () => {
  if (heart.checked) likedIds.push(THIS_ID);
  else likedIds = likedIds.filter(id => id !== THIS_ID);
  localStorage.setItem(LIKE_KEY, JSON.stringify(likedIds));
});

const ddayBox = document.getElementById('dday');
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const [y, m, d] = ddayBox.getAttribute('data-deadline').split('-').map(Number);
const deadline = new Date(y, m - 1, d);
const left = Math.round((deadline - today) / 86400000);

if (left > 0) ddayBox.innerText = 'D-' + left;
else if (left === 0) ddayBox.innerText = 'D-Day';
else ddayBox.innerText = '마감';