// netlify/functions/fetchBrunch.js

const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function(event, context) {
  try {
    // 👉 여기를 절대 metajergory 로 쓰지 말고, 내부 ID인 gcIE 로 바꿔주세요
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@gcIE');

    const posts = feed.items.map(item => ({
      title:   item.title,
      url:     item.link,
      summary: item.contentSnippet || '',
      pubDate: item.pubDate,
      author:  item.creator || item.author || ''
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ data: posts }),
    };
  } catch (error) {
    console.error('Error fetching brunch RSS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching brunch RSS' }),
    };
  }
};

