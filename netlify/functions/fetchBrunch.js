// netlify/functions/fetchBrunch.js
const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function(event, context) {
  try {
    // Brunch RSS 피드 URL → @gcIE 는 여러분 프로필 ID
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@gcIE');
    
    // feed.items 배열을 { title, summary, url } 형태로 변환
    const posts = feed.items.map(item => ({
      title: item.title,
      summary: item.contentSnippet || item.content || '',
      url: item.link
    }));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: posts }),
    };
  } catch (error) {
    console.error('Error fetching Brunch RSS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch brunch RSS' }),
    };
  }
};
