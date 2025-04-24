// netlify/functions/fetchBrunch.js
const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async () => {
  try {
    // 본인의 Brunch RSS 주소로 바꿔주세요.
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@gcIE');

    const data = feed.items.map(item => ({
      title: item.title,
      url:   item.link,
      summary: item.contentSnippet || item.content || ''
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
};

