// netlify/functions/fetchBrunch.js

const Parser = require("rss-parser");
const parser = new Parser();

exports.handler = async function(event, context) {
  try {
    // 본인의 브런치 RSS URL (프로필 페이지 소스에서 확인 가능)
    const feed = await parser.parseURL("https://brunch.co.kr/rss/@@gcIE");

    // feed.items 배열에서 필요한 정보만 추출
    const posts = feed.items.map(item => ({
      title:   item.title,
      summary: item.contentSnippet || item.content || "",
      url:     item.link
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ data: posts })
    };
  } catch (err) {
    console.error("Error fetching brunch RSS:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "RSS fetch failed" })
    };
  }
};
