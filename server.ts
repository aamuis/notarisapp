import express from 'express';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  getAllPhotos,
  savePhotoRecord,
  deletePhotoRecord,
  uploadToVercelBlob,
  isNeonConfigured,
  isBlobConfigured
} from './src/server/db.js';

dotenv.config();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // API Health & Status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      neonConfigured: isNeonConfigured(),
      blobConfigured: isBlobConfigured(),
      timestamp: new Date().toISOString()
    });
  });

  // GET all photos from Neon DB (or in-memory fallback)
  app.get('/api/photos', async (req, res) => {
    try {
      const data = await getAllPhotos();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to retrieve photos' });
    }
  });

  // POST upload photo file to Vercel Blob & record into Neon DB
  app.post('/api/photos/upload', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const { title, description, category, date } = req.body;

      if (!file) {
        return res.status(400).json({ error: 'No image file uploaded' });
      }

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      // Upload to Vercel Blob
      const blobUrl = await uploadToVercelBlob(
        file.buffer,
        file.originalname,
        file.mimetype
      );

      // Save to Neon PostgreSQL
      const record = await savePhotoRecord({
        url: blobUrl,
        title,
        description,
        category: category || 'Dokumentasi',
        date: date || new Date().toISOString().split('T')[0]
      });

      res.status(201).json({
        success: true,
        photo: record,
        storedIn: isNeonConfigured() ? 'neon' : 'memory',
        blobUsed: isBlobConfigured()
      });
    } catch (error: any) {
      console.error('Photo upload error:', error);
      res.status(500).json({ error: error.message || 'Failed to upload photo' });
    }
  });

  // POST manual photo URL save (if user inputs external image URL or direct link)
  app.post('/api/photos', async (req, res) => {
    try {
      const { url, title, description, category, date } = req.body;
      if (!url || !title) {
        return res.status(400).json({ error: 'URL and title are required' });
      }

      const record = await savePhotoRecord({
        url,
        title,
        description,
        category: category || 'Dokumentasi',
        date: date || new Date().toISOString().split('T')[0]
      });

      res.status(201).json({ success: true, photo: record });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to save photo record' });
    }
  });

  // DELETE photo by ID
  app.delete('/api/photos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const success = await deletePhotoRecord(id);
      res.json({ success });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to delete photo' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
