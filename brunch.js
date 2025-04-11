const brunchRss = 'https://brunch.co.kr/@metajergory/rss';
const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(brunchRss)}`;

fetch(proxyUrl)
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, "text/xml");
    const items = xmlDoc.getElementsByTagName('item');
    const articlesList = document.getElementById('articles-list');

    for (let i = 0; i < Math.min(items.length, 5); i++) {
      const title = items[i].getElementsByTagName('title')[0].textContent;
      const link = items[i].getElementsByTagName('link')[0].textContent;
      const description = items[i].getElementsByTagName('description')[0].textContent;

      const articleElement = document.createElement('div');
      articleElement.classList.add('article-card');
      articleElement.innerHTML = `
        <h3><a href="${link}" target="_blank">${title}</a></h3>
        <p>${description}</p>
      `;
      articlesList.appendChild(articleElement);
    }
  })
  .catch(error => {
    console.error('🥲 브런치 RSS 로딩 실패:', error);
    const articlesList = document.getElementById('articles-list');
    articlesList.innerHTML = `<p>브런치 글을 불러올 수 없습니다. 나중에 다시 시도해주세요.</p>`;
  });
