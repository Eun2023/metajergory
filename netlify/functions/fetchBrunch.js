// netlify/functions/fetchBrunch.js

const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function(event, context) {
  try {
    // 브런치 RSS 링크: @@ 뒤에 나오는 ID (gcIE 같은) 를 그대로 사용하세요
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@gcIE');

    // feed.items 배열로 파싱된 글 목록이 들어옵니다.
    return {
      statusCode: 200,
      body: JSON.stringify({ data: feed.items }),
    };
  } catch (error) {
    console.error('Error fetching brunch RSS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching brunch RSS' }),
    };
  }
};
