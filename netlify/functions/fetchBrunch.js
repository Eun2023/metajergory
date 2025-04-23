const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchBrunch() {
  try {
    const url = 'https://brunch.co.kr/@metajergory';  // 브런치 URL
    const res = await fetch(url);  // 해당 URL에서 HTML 데이터 가져오기
    const body = await res.text();  // HTML 텍스트를 읽어옴

    // cheerio로 HTML 파싱
    const $ = cheerio.load(body);

    const posts = [];

    // 각 글(article)에서 필요한 데이터 추출
    $('article').each((index, element) => {
      const title = $(element).find('h2').text();  // 글 제목
      const link = $(element).find('a').attr('href');  // 글 URL
      const summary = $(element).find('p').text();  // 글 요약

      posts.push({ title, summary, url: link });
    });

    return posts;  // 글 데이터 반환
  } catch (error) {
    console.error('Error fetching brunch data:', error);
    return [];  // 오류 발생 시 빈 배열 반환
  }
}

exports.handler = async function(event, context) {
  try {
    const data = await fetchBrunch();  // 데이터를 가져옴
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),  // 데이터를 JSON 형식으로 반환
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching brunch data' }),
    };
  }
};
