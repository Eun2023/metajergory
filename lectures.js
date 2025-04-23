// lectures.js

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Netlify 함수에서 A2:E 범위(제목, 설명, url, img, 유료/무료) 데이터를 가져온다
    const res = await fetch('/.netlify/functions/fetchLectures');
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
    const rows = await res.json();  // [["AI 기초", "설명", "...", "https://…", "유료"], …]
    // ② img URL이 있을 때만 필터링
    const validRows = rows.filter(([title, desc, url, img]) => !!img);
    console.log('LECTURES ROWS (filtered):', validRows);
    // ③ 필터링된 배열로 렌더링
    renderLectures(validRows);
  } catch (err) {
    console.error('강의 목록을 불러오는 중 오류 발생:', err);
    const container = document.querySelector('#lectures .resources-grid');
    container.innerHTML = `<p class="error">강의 목록을 가져오는 데 실패했습니다. 콘솔을 확인해주세요.</p>`;
  }
});

/**
 *  rows: Array of [title, desc, url, img, paid]
 */
function renderLectures(rows) {
  const container = document.querySelector('#lectures .resources-grid');
  // 비어 있으면 안내 문구
  if (!rows.length) {
    container.innerHTML = '<p>등록된 강의가 없습니다.</p>';
    return;
  }

  // 각 행을 카드 형태의 HTML로 변환
  const cardsHtml = rows.map(([title, desc, url, img, paid]) => {
    // paid 컬럼이 비어 있으면 '무료' 처리
    const isPaid = paid && paid.trim() === '유료';
    return `
      <div class="card lecture-card">
        <img 
         src="${img}" 
         alt="${title} 썸네일" 
         class="lecture-thumbnail"
      />
        <div class="card-header">${title}</div>
        <div class="card-body">
          <p>${desc}</p>
          <span class="badge ${isPaid ? 'badge-paid' : 'badge-free'}">
            ${isPaid ? '유료' : '무료'}
          </span>
          <a 
            href="${url}" 
            target="_blank" 
            class="btn-outline"
          >
            ${isPaid ? '결제 후 수강' : '바로 수강'}
          </a>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}
