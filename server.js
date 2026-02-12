const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'public/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware pour lire les données JSON et formulaires
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- CONFIGURATION MYSQL (XAMPP par défaut) ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Utilisateur par défaut XAMPP
    password: 'zenvour',      // Mot de passe vide par défaut
    database: 'association_db' // Nom de votre base
});

// Connexion à la base
db.connect((err) => {
    if (err) {
        console.error('❌ Erreur de connexion MySQL :', err);
        return;
    }
    console.log('✅ Connecté à MySQL avec succès !');
});

// Route pour afficher la page (si on va sur http://localhost:3000)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route API pour enregistrer un membre (AVEC CALCUL AUTOMATIQUE)
app.post('/api/inscrire', (req, res) => {
    const { nom, telephone, situation } = req.body;

    // 1. Vérification
    if (!nom || !telephone || !situation) {
        return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs.' });
    }

    // 2. LOGIQUE AUTOMATIQUE DU MONTANT
    // Si situation est "Oui" (نعم) -> 2000, Sinon -> 1000
    let montant = 0;
    if (situation === 'نعم') {
        montant = 2000;
    } else {
        montant = 1000;
    }

    // 3. Insertion dans la base avec le montant calculé
    const sql = "INSERT INTO membres (nom, telephone, situation, montant) VALUES (?, ?, ?, ?)";

    db.query(sql, [nom, telephone, situation, montant], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        }
        res.json({ success: true, message: 'تم التسجيل بنجاح! (Enregistrement réussi)' });
    });
});

// Route API pour enregistrer une femme (SANS montant ni situation)
app.post('/api/inscrire-femme', (req, res) => {
    const { nom, telephone } = req.body;

    // Vérification
    if (!nom || !telephone) {
        return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs.' });
    }

    // Insertion dans la base
    const sql = "INSERT INTO femmes (nom, telephone) VALUES (?, ?)";

    db.query(sql, [nom, telephone], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        }
        res.json({ success: true, message: 'تم التسجيل بنجاح! (Enregistrement réussi)' });
    });
});

// Route pour récupérer les nouveautés
app.get('/api/nouveautes', (req, res) => {
    const sql = "SELECT * FROM nouveautes ORDER BY date DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        }
        res.json({ success: true, images: results });
    });
});

// Route pour ajouter une nouveauté avec image
app.post('/api/nouveautes', upload.single('image'), (req, res) => {
    const { titre } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) {
        return res.status(400).json({ success: false, message: 'Image requise.' });
    }

    const sql = "INSERT INTO nouveautes (titre, url, date) VALUES (?, ?, NOW())";

    db.query(sql, [titre || 'Sans titre', imageUrl], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        }
        res.json({ success: true, message: 'Nouveauté ajoutée avec succès!' });
    });
});

// Route pour récupérer la liste des hommes inscrits
app.get('/api/membres', (req, res) => {
    const sql = "SELECT * FROM membres ORDER BY date_inscription DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        }
        res.json({ success: true, membres: results });
    });
});

// Route pour récupérer la liste des femmes inscrites
app.get('/api/femmes', (req, res) => {
    const sql = "SELECT * FROM femmes ORDER BY date_inscription DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        }
        res.json({ success: true, femmes: results });
    });
});

// --- DÉMARRAGE DU SERVEUR ---
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});