// brunch.js
fetch('/.netlify/functions/fetchBrunch')
  .then(res => res.json())
  .then(response => {
    console.log("BRUNCH RESPONSE:", response);

    const container = document.querySelector('#latest-posts .resources-grid');

    // response.data 가 배열 형태로 넘어옵니다
    if (response && Array.isArray(response.data)) {
      response.data.forEach(work => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
          <div class="card-header">${work.title}</div>
          <div class="card-body">
            <p>${work.summary}</p>
            <a href="${work.url}" target="_blank" class="btn-outline">글 보기</a>
          </div>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = '<p>브런치 글이 없습니다.</p>';
      console.warn('데이터가 유효하지 않습니다:', response);
    }
  })
  .catch(err => console.error('브런치 글 불러오기 실패:', err));

