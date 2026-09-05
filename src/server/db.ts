import { neon } from '@neondatabase/serverless';
import { put, del } from '@vercel/blob';

export interface PhotoRecord {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  created_at?: string;
}

// Initial default documentation photos of Notary office
const initialPhotos: PhotoRecord[] = [
  {
    id: 'photo-1',
    url: '/SYARIFAH NURUL.png',
    title: 'Potret Resmi Notaris Syarifah Nurul Aziizi, S.H., M.Kn.',
    description: 'Foto dinas resmi Notaris dan Pejabat Pembuat Akta Kota Serang, Banten.',
    category: 'Profil & Legalitas',
    date: '2025-01-15'
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    title: 'Ruang Penandatanganan & Pembacaan Akta Otentik',
    description: 'Ruang pertemuan representatif dan privat untuk pembacaan akta notariil bersama para pihak penghadap.',
    category: 'Ruang Kantor',
    date: '2025-02-10'
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    title: 'Konsultasi Hukum Perdata & Legalitas Korporasi',
    description: 'Pemeriksaan berkas kepatuhan hukum PT, anggaran dasar RUPS, dan pendaftaran OSS RBA.',
    category: 'Pelayanan Klien',
    date: '2025-03-01'
  }
];

// In-memory fallback if Neon DB credentials are not configured locally
let fallbackPhotos: PhotoRecord[] = [...initialPhotos];

function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

export function isNeonConfigured(): boolean {
  return !!getDatabaseUrl();
}

export function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

let tableInitialized = false;

async function initDb(sql: any) {
  if (tableInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS photos (
        id VARCHAR(64) PRIMARY KEY,
        url TEXT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) DEFAULT 'Umum',
        date VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Check if table is empty; if so, seed initial records
    const existing = await sql`SELECT COUNT(*) as count FROM photos;`;
    if (Number(existing[0]?.count) === 0) {
      for (const p of initialPhotos) {
        await sql`
          INSERT INTO photos (id, url, title, description, category, date)
          VALUES (${p.id}, ${p.url}, ${p.title}, ${p.description || ''}, ${p.category}, ${p.date})
          ON CONFLICT (id) DO NOTHING;
        `;
      }
    }
    tableInitialized = true;
  } catch (err) {
    console.warn('Could not auto-initialize photos table in Neon:', err);
  }
}

export async function getAllPhotos(): Promise<{ photos: PhotoRecord[]; source: 'neon' | 'memory'; isNeonConnected: boolean; isBlobConnected: boolean }> {
  const dbUrl = getDatabaseUrl();
  const isBlob = isBlobConfigured();

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initDb(sql);
      const rows = await sql`SELECT * FROM photos ORDER BY created_at DESC;`;
      return {
        photos: rows.map((r: any) => ({
          id: r.id,
          url: r.url,
          title: r.title,
          description: r.description,
          category: r.category,
          date: r.date,
          created_at: r.created_at
        })),
        source: 'neon',
        isNeonConnected: true,
        isBlobConnected: isBlob
      };
    } catch (error) {
      console.error('Error fetching from Neon database, using fallback:', error);
    }
  }

  return {
    photos: fallbackPhotos,
    source: 'memory',
    isNeonConnected: false,
    isBlobConnected: isBlob
  };
}

export async function uploadToVercelBlob(
  fileBuffer: Buffer,
  originalFilename: string,
  contentType: string
): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  
  if (token) {
    // Sanitize filename
    const cleanName = originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const blobName = `notaris-galeri/${Date.now()}-${cleanName}`;
    const blob = await put(blobName, fileBuffer, {
      access: 'public',
      token,
      contentType
    });
    return blob.url;
  }

  // Fallback when token is not provided in local dev environment
  const base64 = fileBuffer.toString('base64');
  return `data:${contentType || 'image/jpeg'};base64,${base64}`;
}

export async function savePhotoRecord(photo: Omit<PhotoRecord, 'id'> & { id?: string }): Promise<PhotoRecord> {
  const id = photo.id || `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const record: PhotoRecord = {
    id,
    url: photo.url,
    title: photo.title,
    description: photo.description || '',
    category: photo.category || 'Dokumentasi',
    date: photo.date || new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString()
  };

  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initDb(sql);
      await sql`
        INSERT INTO photos (id, url, title, description, category, date)
        VALUES (${record.id}, ${record.url}, ${record.title}, ${record.description}, ${record.category}, ${record.date});
      `;
      return record;
    } catch (error) {
      console.error('Failed to save in Neon DB, storing in fallback:', error);
    }
  }

  fallbackPhotos.unshift(record);
  return record;
}

export async function deletePhotoRecord(id: string): Promise<boolean> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      const existing = await sql`SELECT url FROM photos WHERE id = ${id};`;
      if (existing.length > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
        const url = existing[0].url;
        if (url.includes('blob.vercel-storage.com')) {
          try {
            await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
          } catch (e) {
            console.warn('Could not delete from Vercel Blob:', e);
          }
        }
      }
      await sql`DELETE FROM photos WHERE id = ${id};`;
      return true;
    } catch (error) {
      console.error('Failed to delete from Neon DB:', error);
    }
  }

  fallbackPhotos = fallbackPhotos.filter((p) => p.id !== id);
  return true;
}
