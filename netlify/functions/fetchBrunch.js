// netlify/functions/fetchBrunch.js

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // Brunch RSS URL (프로필 페이지 <head>의 <link rel="alternate"> href 값)
    const rssUrl = 'https://brunch.co.kr/rss/@@gcIE';

    // rss2json API로 XML→JSON 변환
    const apiRes = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    );
    const rssData = await apiRes.json();

    // items 배열을 우리가 쓸 형태로 매핑
    const posts = (rssData.items || []).map(item => ({
      title:   item.title,
      summary: item.description,
      url:     item.link
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ data: posts }),
    };
  } catch (error) {
    console.error('Error fetching brunch RSS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
