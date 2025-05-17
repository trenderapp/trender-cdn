import express from "express";
import axios from "axios";
import cors from "cors";

const GstorageURL = "https://storage.googleapis.com/cdn2.trenderapp.com";
const port = 1026;

const app = express();

app.use(cors());

app.get('/*', async (req, res) => {
  try {
    const path = req.url === '/' ? '/index.html' : req.url;
    const response = await axios.get(`${GstorageURL}${path}`, {
      responseType: 'stream',
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    // Transfert des headers critiques
    res.setHeader('Content-Type', response.headers['content-type']);
    if (response.headers['content-length'] !== undefined) {
      res.setHeader('Content-Length', response.headers['content-length']);
    }
    res.setHeader('Cache-Control', 'public, max-age=86400');


    // Pipeline optimisé pour gros fichiers
    response.data.on('data', (chunk: Buffer) => {
      res.write(chunk);
    });

    response.data.on('end', () => {
      res.end();
    });

    response.data.on('error', (err: Error) => {
      console.error('Stream error:', err);
      res.sendStatus(500);
    });

  } catch (error: any) {
    if (error.response?.status) {
      res.sendStatus(error.response.status);
    } else {
      console.error('Proxy error:', error);
      res.sendStatus(500);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
