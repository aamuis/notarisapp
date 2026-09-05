import type { IncomingMessage, ServerResponse } from 'http';
import { getAllPhotos, savePhotoRecord, deletePhotoRecord } from '../src/server/db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const data = await getAllPhotos();
      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { url, title, description, category, date } = req.body || {};
      if (!url || !title) {
        return res.status(400).json({ error: 'url and title are required' });
      }
      const record = await savePhotoRecord({ url, title, description, category, date });
      return res.status(201).json({ success: true, photo: record });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query || {};
      if (!id) return res.status(400).json({ error: 'id required' });
      await deletePhotoRecord(id);
      return res.status(200).json({ success: true });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
