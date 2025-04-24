// netlify/functions/fetchBrunch.js
const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function(event, context) {
  try {
    // 본인의 Brunch RSS URL (프로필 ID 부분을 확인하세요)
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@gcIE');
    // feed.items 배열에서 필요한 데이터만 뽑아냅니다
    const data = feed.items.map(item => ({
      title: item.title,
      summary: item.contentSnippet || item.content || '',
      url: item.link
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (error) {
    console.error('Error fetching brunch RSS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching brunch RSS' })
    };
  }
};
