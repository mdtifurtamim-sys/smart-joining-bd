import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT && process.env.PORT !== '8080' ? Number(process.env.PORT) : 3000;

// ================= ১. বডি পার্সার ও স্ট্যাটিক ফাইল হ্যান্ডলার =================
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// ফাইল আপলোড ফোল্ডার পাথ
const UPLOAD_DIR = path.resolve(__dirname, 'public', 'uploads');
const SUPPORT_UPLOAD_DIR = path.resolve(__dirname, 'public', 'uploads', 'support');
const DATA_DIR = path.resolve(__dirname, 'data');

// প্রয়োজনীয় ফোল্ডারগুলো স্বয়ংক্রিয় তৈরি করা
[UPLOAD_DIR, SUPPORT_UPLOAD_DIR, DATA_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// স্ট্যাটিক ফাইল সার্ভিং
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/uploads', express.static(UPLOAD_DIR));

// ================= ২. ফাইল আপলোড কনফিগারেশন (Multer) =================
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const rawUserId = req.body?.userId || 'guest';
    const sanitizedId = String(rawUserId).replace(/[^a-zA-Z0-9_-]/g, '');
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `proof_${sanitizedId}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ================= ৩. ডাটাবেজ হেল্পার ফাংশন (JSON Persistence) =================
const loadJson = (filename, defaultValue) => {
  const filePath = path.resolve(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
  }
  return defaultValue;
};

const saveJson = (filename, data) => {
  const filePath = path.resolve(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
};

// ================= ৪. কোর এপিআই রাউটস =================

// ৪.১. ইউজার প্রোফাইল ডাটা লোড
app.get('/api/user/:id', (req, res) => {
  const users = loadJson('users.json', []);
  const user = users.find((u) => u.id === req.params.id || u.phone === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'ব্যবহারকারী পাওয়া যায়নি' });
  }
  return res.json({ success: true, user });
});

// ৪.২. প্রজেক্ট কনফিগারেশন ও ON/OFF স্ট্যাটাস সিঙ্ক
app.get('/api/projects/configs', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  const configs = loadJson('projectConfigs.json', {});
  return res.json({ success: true, configs });
});

// ৪.৩. নোটিফিকেশন সেন্টার ডাটা
app.get('/api/notices', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  const notices = loadJson('notices.json', []);
  return res.json({ success: true, notices });
});

// ৪.৪. রেগুলার ভাউচার সেটিংস
app.get('/api/voucher-points/settings', (_req, res) => {
  const settings = loadJson('voucherSettings.json', {
    bkashNumber: '01866255596',
    nagadNumber: '01866255596',
    rocketNumber: '018662555968',
    conversionRate: 1,
    minDeposit: 50,
    minWithdrawal: 100,
  });
  return res.json({ success: true, settings });
});

// ৪.৫. ভাউচার রিকোয়েস্ট সাবমিশন (পেমেন্ট প্রুফ স্ক্রিনশটসহ)
app.post('/api/voucher-points/request', upload.single('screenshot'), (req, res) => {
  const { userId, userName, userPhone, method, senderNumber, trxId, amount } = req.body;
  const requests = loadJson('voucherRequests.json', []);
  
  const newRequest = {
    id: `VR-${Date.now()}`,
    userId,
    userName,
    userPhone,
    method,
    senderNumber,
    trxId,
    amount: Number(amount),
    screenshot: req.file ? `/uploads/${req.file.filename}` : null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  requests.unshift(newRequest);
  saveJson('voucherRequests.json', requests);

  return res.json({ success: true, message: 'রিকোয়েস্ট সফলভাবে জমা হয়েছে', request: newRequest });
});

// ৪.৬. ছবি / স্ক্রিনশট আপলোড সাধারণ এপিআই
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'কোনো ফাইল আপলোড করা হয়নি' });
  }
  return res.json({
    success: true,
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
  });
});

// ================= ৫. প্রোডাকশন ফ্রন্টএন্ড ইন্টিগ্রেশন (Vite SPA) =================
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // প্রোডাকশনে dist ফোল্ডারের ফাইল সার্ভ করবে
    const distPath = path.resolve(__dirname, '../dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // ডেভেলপমেন্টে Vite মিডলওয়্যার
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SMART JOINING BD Server is live on http://localhost:${PORT}`);
  });
}

startServer();
