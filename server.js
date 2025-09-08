const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/udemy/:slug', async (req, res) => {
  const slug = req.params.slug;
  try {
    // Built-in fetch (Node 18+ only)
    const response = await fetch(`https://www.udemy.com/api-2.0/courses/${slug}/`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch course' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Use Render's assigned port
const PORT = process.env.PORT || 3000;

// ✅ Bind to 0.0.0.0 for Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend proxy running on port ${PORT}`);
});
