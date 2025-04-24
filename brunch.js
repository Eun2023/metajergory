// brunch.js
fetch('/.netlify/functions/fetchBrunch')
  .then(res => res.json())
  .then(json => {
    console.log('BRUNCH RESPONSE', json);
    const container = document.querySelector('#latest-posts .resources-grid');

    if (json.data && Array.isArray(json.data) && json.data.length) {
      json.data.forEach(post => {
        // feed.items 에서 매핑한 필드명을 그대로 사용합니다
        const { title, url, summary } = post;

        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
          <div class="card-header">${title}</div>
          <div class="card-body">
            <p>${summary}</p>
            <a href="${url}" target="_blank" class="btn-outline">글 보기</a>
          </div>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = '<p>브런치 글이 없습니다.</p>';
      console.warn('데이터가 유효하지 않습니다:', json);
    }
  })
  .catch(err => console.error('브런치 글 불러오기 실패:', err));

