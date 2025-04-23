// netlify/functions/fetchLectures.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const sheetId = process.env.SHEET_ID;
  const apiKey = process.env.SHEETS_API_KEY;

  console.log("ENV CHECK:", "SHEET_ID =", sheetId, "| SHEETS_API_KEY =", apiKey);  // 이 줄 추가!

  const range = encodeURIComponent('Sheet1!A2:E');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
    const errorText = await res.text();
    console.log("GOOGLE SHEET ERROR", errorText);
      return {
        statusCode: res.status,
        body: await res.text(),
      };
    }
    const data = await res.json();
    console.log("GOOGLE SHEET RESPONSE", data);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data.values || []),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};


