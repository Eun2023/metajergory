// netlify/functions/fetchBrunch.js
const Parser = require("rss-parser");
const parser = new Parser();

exports.handler = async function(event, context) {
  try {
    // 메타저고리 브런치 RSS URL (프로필 → 우클릭 → RSS 링크 복사)
    const feed = await parser.parseURL("https://brunch.co.kr/rss/@@gcIE");

    // 필요한 항목만 뽑아서 새로운 배열로 만듭니다
    const posts = feed.items.map(item => ({
      title: item.title,
      summary: item.contentSnippet || "",
      url: item.link
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ data: posts })
    };
  } catch (err) {
    console.error("fetchBrunch error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch RSS feed" })
    };
  }
};
