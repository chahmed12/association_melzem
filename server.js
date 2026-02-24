require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3006;

// ─── PostgreSQL Connection Pool ───────────────────────────────────────
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false
});

// Test de connexion au démarrage
pool.connect()
    .then(client => {
        console.log('✅ PostgreSQL connecté');
        client.release();
    })
    .catch(err => console.error('❌ Erreur connexion PostgreSQL:', err.message));

// ─── Middleware ────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Init DB Tables ───────────────────────────────────────────────────
async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS "membreMelzem" (
                id          SERIAL PRIMARY KEY,
                nom         VARCHAR(200) NOT NULL,
                telephone   VARCHAR(30),
                age         VARCHAR(20),
                village     VARCHAR(100),
                situation   VARCHAR(10) DEFAULT 'لا',
                date_inscription TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS "femmesMelzem" (
                id          SERIAL PRIMARY KEY,
                nom         VARCHAR(200) NOT NULL,
                telephone   VARCHAR(30),
                age         VARCHAR(20),
                village     VARCHAR(100),
                date_inscription TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log('✅ Tables PostgreSQL initialisées');
    } catch (err) {
        console.error('❌ Erreur init DB:', err.message);
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────

// PostgreSQL utilise $1, $2... au lieu de ? pour les paramètres
// pool.query('SELECT * FROM table WHERE id = $1', [id])

// ─── API HOMMES ───────────────────────────────────────────────────────

// GET — Liste tous les hommes
app.get('/api/membreMelzem', async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM "membreMelzem" ORDER BY date_inscription DESC'
        );
        res.json({ success: true, membreMelzem: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// POST — Ajouter un homme
app.post('/api/membreMelzem', async (req, res) => {
    const { nom, telephone, age, village, situation } = req.body;

    if (!nom || !nom.trim())
        return res.status(400).json({ success: false, message: 'الاسم مطلوب' });

    try {
        // Vérifier doublon téléphone
        if (telephone && telephone.trim()) {
            const { rows } = await pool.query(
                'SELECT id FROM "membreMelzem" WHERE telephone = $1',
                [telephone.trim()]
            );
            if (rows.length > 0)
                return res.status(409).json({ success: false, message: 'رقم الهاتف مسجل مسبقاً' });
        }

        // Vérifier doublon nom (insensible à la casse)
        const { rows: nomRows } = await pool.query(
            'SELECT id FROM "membreMelzem" WHERE LOWER(nom) = LOWER($1)',
            [nom.trim()]
        );
        if (nomRows.length > 0)
            return res.status(409).json({ success: false, message: 'هذا الاسم مسجل مسبقاً' });

        // Insérer
        const { rows: inserted } = await pool.query(
            `INSERT INTO "membreMelzem" (nom, telephone, age, village, situation)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
            [
                nom.trim(),
                telephone?.trim() || null,
                age || null,
                village?.trim() || null,
                situation || 'لا'
            ]
        );

        res.status(201).json({ success: true, id: inserted[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'خطأ في قاعدة البيانات' });
    }
});

// DELETE — Supprimer un homme
app.delete('/api/membreMelzem/:id', async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM "membreMelzem" WHERE id = $1',
            [req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// ─── API FEMMES ───────────────────────────────────────────────────────

// GET — Liste toutes les femmes
app.get('/api/femmesMelzem', async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM "femmesMelzem" ORDER BY date_inscription DESC'
        );
        res.json({ success: true, femmesMelzem: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// POST — Ajouter une femme
app.post('/api/femmesMelzem', async (req, res) => {
    const { nom, telephone, age, village } = req.body;

    if (!nom || !nom.trim())
        return res.status(400).json({ success: false, message: 'الاسم مطلوب' });

    try {
        // Vérifier doublon téléphone
        if (telephone && telephone.trim()) {
            const { rows } = await pool.query(
                'SELECT id FROM "femmesMelzem" WHERE telephone = $1',
                [telephone.trim()]
            );
            if (rows.length > 0)
                return res.status(409).json({ success: false, message: 'رقم الهاتف مسجل مسبقاً' });
        }

        // Vérifier doublon nom
        const { rows: nomRows } = await pool.query(
            'SELECT id FROM "femmesMelzem" WHERE LOWER(nom) = LOWER($1)',
            [nom.trim()]
        );
        if (nomRows.length > 0)
            return res.status(409).json({ success: false, message: 'هذا الاسم مسجل مسبقاً' });

        // Insérer
        const { rows: inserted } = await pool.query(
            `INSERT INTO "femmesMelzem" (nom, telephone, age, village)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [
                nom.trim(),
                telephone?.trim() || null,
                age || null,
                village?.trim() || null
            ]
        );

        res.status(201).json({ success: true, id: inserted[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'خطأ في قاعدة البيانات' });
    }
});

// DELETE — Supprimer une femme
app.delete('/api/femmesMelzem/:id', async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM "femmesMelzem" WHERE id = $1',
            [req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// ─── API Vérification doublon temps réel ──────────────────────────────
app.get('/api/check-doublon', async (req, res) => {
    const { telephone, nom, type } = req.query;

    // Sécurité : seulement les tables autorisées
    const table = type === 'femmesMelzem' ? '"femmesMelzem"' : '"membreMelzem"';

    try {
        if (telephone) {
            const { rows } = await pool.query(
                `SELECT id FROM ${table} WHERE telephone = $1`,
                [telephone]
            );
            return res.json({ exists: rows.length > 0 });
        }

        if (nom) {
            const { rows } = await pool.query(
                `SELECT id FROM ${table} WHERE LOWER(nom) = LOWER($1)`,
                [nom]
            );
            return res.json({ exists: rows.length > 0 });
        }

        res.json({ exists: false });
    } catch (err) {
        console.error(err);
        res.status(500).json({ exists: false });
    }
});

// ─── API Stats ────────────────────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
    try {
        const { rows: h }  = await pool.query('SELECT COUNT(*) AS count FROM "membreMelzem"');
        const { rows: f }  = await pool.query('SELECT COUNT(*) AS count FROM "femmesMelzem"');
        const { rows: tr } = await pool.query(
            `SELECT COUNT(*) AS count FROM "membreMelzem" WHERE situation = 'نعم'`
        );

        res.json({
            success:      true,
            hommes:       parseInt(h[0].count),
            femmes:       parseInt(f[0].count),
            travaillent:  parseInt(tr[0].count)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// ─── Route admin ──────────────────────────────────────────────────────
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ─── Fallback SPA ─────────────────────────────────────────────────────
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Démarrage ────────────────────────────────────────────────────────
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        console.log(`🌍 Mode: ${process.env.NODE_ENV || 'development'}`);
    });
});