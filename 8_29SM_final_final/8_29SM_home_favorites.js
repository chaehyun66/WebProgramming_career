(() => {
  const recruitIds = ['recruit-002','recruit-003','home-recruit-003','home-recruit-004','recruit-001','home-recruit-006','recruit-006','home-recruit-008','recruit-007','home-recruit-010','home-recruit-011','home-recruit-012'];
  fetch('8_29SM_MyPage.json').then(response => {
    if (!response.ok) throw new Error('공고 정보 로드 실패');
    return response.json();
  }).then(data => {
    function connect(card, item, selector) {
      if (!item) return;
      const deadline = card.querySelector(selector);
      if (deadline) {
        deadline.textContent = Favorites.dday(item.deadline);
        deadline.title = item.deadline;
      }
      const heart = document.createElement('button');
      heart.type = 'button';
      heart.className = 'home-favorite';
      heart.setAttribute('aria-label', item.title + ' 찜하기');
      card.append(heart);
      Favorites.bind(heart, item.id);
    }
    document.querySelectorAll('.contest-scroll .contest-card').forEach(card => {
      const thumb = card.querySelector('img').getAttribute('src');
      connect(card, data.likes.find(x => x.thumb === thumb && x.category === '공모전'), '.dday');
    });
    document.querySelectorAll('.recruit-card').forEach((card, i) => {
      connect(card, data.likes.find(x => x.id === recruitIds[i]), '.deadline');
    });
  }).catch(console.error);
})();

/* 커뮤니티 좋아요 */
window.addEventListener("load", initializeCommunityLikes);

function initializeCommunityLikes() {
  const items = document.querySelectorAll(
    ".community-post .likes" 
  );
  
  for (let i = 0; i < items.length; i++) {
    const button = items[i].querySelector(
      ".community-like"
    );

    const count = items[i].querySelector(
      ".community-like-count"
    );

    const originalCount = parseInt(count.innerText);
    let liked = false;

    button.addEventListener("click", function () {
      if (liked) {
        liked = false;

        button.innerText = "♡";
        count.innerText = originalCount;

        button.setAttribute("aria-pressed", "false");
        button.setAttribute("aria-label", "이 글 좋아요");
      } else {
        liked = true;

        button.innerText = "♥";
        count.innerText = originalCount + 1;

        button.setAttribute("aria-pressed", "true");
        button.setAttribute(
          "aria-label",
          "이 글 좋아요 취소"
        );
      }
    });
  }
}