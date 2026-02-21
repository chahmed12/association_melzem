require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3006;

// ─── MySQL Connection Pool ─────────────────────────────────────────────
const pool = mysql.createPool({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT || 3306,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// ─── Middleware ────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Init DB Tables ───────────────────────────────────────────────────
async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS membreMelzem (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nom VARCHAR(200) NOT NULL,
                telephone VARCHAR(30),
                age VARCHAR(20),
                village VARCHAR(100),
                situation VARCHAR(10) DEFAULT 'لا',
                date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS femmesMelzem (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nom VARCHAR(200) NOT NULL,
                telephone VARCHAR(30),
                age VARCHAR(20),
                village VARCHAR(100),
                date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);
        console.log('✅ Tables MySQL initialisées');
    } catch (err) {
        console.error('❌ Erreur init DB:', err.message);
    }
}

// ─── API HOMMES ───────────────────────────────────────────────────────

app.get('/api/membreMelzem', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM membreMelzem ORDER BY date_inscription DESC');
        res.json({ success: true, membreMelzem: rows });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

app.post('/api/membreMelzem', async (req, res) => {
    const { nom, telephone, age, village, situation } = req.body;
    if (!nom || !nom.trim()) return res.status(400).json({ success: false, message: 'الاسم مطلوب' });

    try {
        // Doublon téléphone
        if (telephone && telephone.trim()) {
            const [ex] = await pool.query('SELECT id FROM membreMelzem WHERE telephone = ?', [telephone.trim()]);
            if (ex.length > 0) return res.status(409).json({ success: false, message: 'رقم الهاتف مسجل مسبقاً' });
        }
        // Doublon nom
        const [nomEx] = await pool.query('SELECT id FROM membreMelzem WHERE LOWER(nom) = LOWER(?)', [nom.trim()]);
        if (nomEx.length > 0) return res.status(409).json({ success: false, message: 'هذا الاسم مسجل مسبقاً' });

        const [result] = await pool.query(
            'INSERT INTO membreMelzem (nom, telephone, age, village, situation) VALUES (?, ?, ?, ?, ?)',
            [nom.trim(), telephone?.trim() || null, age || null, village?.trim() || null, situation || 'لا']
        );
        res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'خطأ في قاعدة البيانات' });
    }
});

app.delete('/api/membreMelzem/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM membreMelzem WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// ─── API FEMMES ───────────────────────────────────────────────────────

app.get('/api/femmesMelzem', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM femmesMelzem ORDER BY date_inscription DESC');
        res.json({ success: true, femmesMelzem: rows });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

app.post('/api/femmesMelzem', async (req, res) => {
    const { nom, telephone, age, village } = req.body;
    if (!nom || !nom.trim()) return res.status(400).json({ success: false, message: 'الاسم مطلوب' });

    try {
        if (telephone && telephone.trim()) {
            const [ex] = await pool.query('SELECT id FROM femmesMelzem WHERE telephone = ?', [telephone.trim()]);
            if (ex.length > 0) return res.status(409).json({ success: false, message: 'رقم الهاتف مسجل مسبقاً' });
        }
        const [nomEx] = await pool.query('SELECT id FROM femmesMelzem WHERE LOWER(nom) = LOWER(?)', [nom.trim()]);
        if (nomEx.length > 0) return res.status(409).json({ success: false, message: 'هذا الاسم مسجل مسبقاً' });

        const [result] = await pool.query(
            'INSERT INTO femmesMelzem (nom, telephone, age, village) VALUES (?, ?, ?, ?)',
            [nom.trim(), telephone?.trim() || null, age || null, village?.trim() || null]
        );
        res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'خطأ في قاعدة البيانات' });
    }
});

app.delete('/api/femmesMelzem/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM femmesMelzem WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// ─── API vérification doublon temps réel ─────────────────────────────
app.get('/api/check-doublon', async (req, res) => {
    const { telephone, nom, type } = req.query;
    const table = type === 'femmesMelzem' ? 'femmesMelzem' : 'membreMelzem';
    try {
        if (telephone) {
            const [rows] = await pool.query(`SELECT id FROM ${table} WHERE telephone = ?`, [telephone]);
            return res.json({ exists: rows.length > 0 });
        }
        if (nom) {
            const [rows] = await pool.query(`SELECT id FROM ${table} WHERE LOWER(nom) = LOWER(?)`, [nom]);
            return res.json({ exists: rows.length > 0 });
        }
        res.json({ exists: false });
    } catch (err) {
        res.status(500).json({ exists: false });
    }
});

// ─── Stats ────────────────────────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
    try {
        const [[{ total_h }]] = await pool.query('SELECT COUNT(*) as total_h FROM membreMelzem');
        const [[{ total_f }]] = await pool.query('SELECT COUNT(*) as total_f FROM femmesMelzem');
        const [[{ travaillent }]] = await pool.query("SELECT COUNT(*) as travaillent FROM membreMelzem WHERE situation = 'نعم'");
        res.json({ success: true, hommes: total_h, femmesMelzem: total_f, travaillent });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// ─── Pages HTML ───────────────────────────────────────────────────────
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ─── Démarrage ────────────────────────────────────────────────────────
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        console.log(`🌍 Mode: ${process.env.NODE_ENV || 'development'}`);
    });
});