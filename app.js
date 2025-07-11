
require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/analyze-code', async (req, res) => {
  try {
    const { code, language, task } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Kode tidak boleh kosong' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    let prompt = `Anda adalah asisten coding untuk pemrograman ${language}. `;
    prompt += `Tugas: ${task || 'Analisis dan perbaiki kode berikut'}.\n\n`;
    prompt += `Kode:\n${code}\n\n`;
    prompt += `Berikan:\n1. Penjelasan cara kerja kode\n2. Potensi bug\n3. Perbaikan yang disarankan\n4. Contoh implementasi\n`;
    prompt += `Format respon dalam HTML dengan class untuk styling` + 'Gunakan <pre class="code-example"> untuk contoh kode`';

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ analysis: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menganalisis kode' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server berjalan di http://0.0.0.0:${port}`);
});