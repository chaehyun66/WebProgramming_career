const LIKE_KEY = 'likedIds';
const THIS_ID = 'recruit-001';
const heart = document.getElementById('like-check');

Favorites.bind(heart, THIS_ID);

const ddayBox = document.getElementById('dday');
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const [y, m, d] = ddayBox.getAttribute('data-deadline').split('-').map(Number);
const deadline = new Date(y, m - 1, d);
const left = Math.round((deadline - today) / 86400000);

if (left > 0) ddayBox.innerText = 'D-' + left;
else if (left === 0) ddayBox.innerText = '오늘 마감';
else ddayBox.innerText = '마감';
