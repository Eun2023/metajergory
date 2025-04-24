// netlify/functions/fetchBrunch.js
const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function(event, context) {
  try {
    // RSS 피드 주소: @@ 뒤에 나오는 ID를 그대로 사용
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@metajergory');

    // 필요한 필드만 골라서 배열로 재생성
    const posts = feed.items.map(item => ({
      title:   item.title,
      url:     item.link,
      summary: item.contentSnippet || '',
      pubDate: item.pubDate,
      author:  item.creator || item.author
    }));

    return {
      statusCode: 200,
      body:       JSON.stringify({ data: posts }),
    };
  } catch (error) {
    console.error('Error fetching brunch RSS:', error);
    return {
      statusCode: 500,
      body:       JSON.stringify({ error: 'Error fetching brunch RSS' }),
    };
  }
};
