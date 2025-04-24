const fetch   = require('node-fetch');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
  try {
    // 올바른 RSS URL
    const rssUrl = 'https://brunch.co.kr/rss/@@gcIE';
    const res    = await fetch(rssUrl);
    const xml    = await res.text();

    // XML 파싱 모드로 cheerio 초기화
    const $      = cheerio.load(xml, { xmlMode: true });
    const items  = [];

    // <item> 태그마다 순회
    $('item').each((_, el) => {
      const title       = $(el).find('title').text();
      const link        = $(el).find('link').text();
      const description = $(el).find('description').text();
      items.push({
        title,
        url: link,
        summary: description
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ data: items }),
    };

  } catch (err) {
    console.error('fetchBrunch error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
