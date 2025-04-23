// brunch-feed.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.brunch.co.kr/v4/@metajergory/works?size=6')
    .then(res => res.json())
    .then(json => {
      const posts = json.works || [];
      const container = document.querySelector('#latest-posts .resources-grid');
      posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
          <div class="card-header">${post.title}</div>
          <div class="card-body">
            <p>${post.description||''}</p>
            <a href="${post.url}" target="_blank" class="btn-outline">글 읽기</a>
          </div>`;
        container.appendChild(card);
      });
    })
    .catch(console.error);
});
