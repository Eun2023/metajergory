const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function() {
  try {
    // 브런치 RSS URL: https://brunch.co.kr/rss/@@gcIE
    const feed = await parser.parseURL('https://brunch.co.kr/rss/@@gcIE');

    const data = feed.items.map(item => ({
      title:   item.title,
      summary: item.contentSnippet || item.content || '',
      url:     item.link
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (err) {
    console.error('RSS fetch error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch RSS' })
    };
  }
};

