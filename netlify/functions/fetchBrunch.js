// netlify/functions/fetchBrunch.js

const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function () {
  try {
    // 본인의 브런치 프로필 RSS URL
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@metajergory');
    
    // feed.items는 [{ title, link, contentSnippet, isoDate, ... }, …]
    const posts = feed.items.map(item => ({
      title: item.title,
      url:   item.link,
      summary: item.contentSnippet || ''
    }));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: posts })
    };
  } catch (err) {
    console.error("fetchBrunch error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
