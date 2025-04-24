// netlify/functions/fetchBrunch.js

const Parser = require("rss-parser");
const parser = new Parser();

exports.handler = async function(event, context) {
  try {
    // 본인 프로필의 브런치 RSS URL (브런치 프로필 HTML <link rel="alternate"...> 에서 가져오기)
    const feed = await parser.parseURL("https://brunch.co.kr/rss/@@gcIE");

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
