// netlify/functions/fetchBrunch.js
const Parser = require("rss-parser");
const parser = new Parser();

exports.handler = async function() {
  try {
    const feed = await parser.parseURL("https://brunch.co.kr/rss/@@gcIE");
    const posts = feed.items.map(item => ({
      title: item.title,
      summary: item.contentSnippet || "",
      url: item.link
    }));
    return { statusCode: 200, body: JSON.stringify({ data: posts }) };
  } catch (err) {
    console.error("fetchBrunch error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch RSS feed" }) };
  }
};
