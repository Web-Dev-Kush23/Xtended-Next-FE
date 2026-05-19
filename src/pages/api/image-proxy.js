import axios from 'axios';

export default async function handler(req, res) {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const decodedUrl = decodeURIComponent(imageUrl);
    const response = await axios.get(decodedUrl, {
      responseType: 'arraybuffer',
    });

    res.setHeader('Content-Type', response.headers['content-type'] || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(response.data);
  } catch (error) {
    console.error("Image Proxy Error:", {
      message: error.message,
      requestedUrl: decodeURIComponent(imageUrl),
      status: error.response?.status,
    });
    res.status(500).json({ error: 'Failed to fetch image from Azure Blob' });
  }
}
