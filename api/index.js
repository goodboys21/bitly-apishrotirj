const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Ganti ini kalau kamu mau ubah API key
const VALID_API_KEY = 'bagus';

app.get('/tools/bily', async (req, res) => {
  const { url, apikey } = req.query;

  if (!apikey || apikey !== VALID_API_KEY) {
    return res.status(403).json({
      status: false,
      creator: 'Bagus Bahril',
      message: 'API key tidak valid.'
    });
  }

  if (!url) {
    return res.status(400).json({
      status: false,
      creator: 'Bagus Bahril',
      message: 'Parameter "url" wajib diisi.'
    });
  }

  try {
    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 6ce863041e219e5e13e8216a80a9fe38d8a38d97',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ long_url: url }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: false,
        creator: 'Bagus Bahril',
        message: data.message || 'Gagal memperpendek URL.'
      });
    }

    return res.json({
      status: true,
      creator: 'Bagus Bahril',
      short_url: data.link
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      creator: 'Bagus Bahril',
      message: 'Terjadi kesalahan server.',
      error: err.message
    });
  }
});

module.exports = app;
