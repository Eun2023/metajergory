// netlify/functions/fetchBrunch.js
const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async () => {
  try {
    // 여기서 "@@gcIE" 는 메타저고리 프로필 ID 입니다.
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@gcIE');
    const data = feed.items.map(item => ({
      title: item.title,
      summary: item.contentSnippet,
      url: item.link
    }));
    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
