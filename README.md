# 🌿 رابطة الطليعة الشبابية لبلدية ملزم تيشط
### Association de la Jeunesse de Melzam Tichit — Mauritanie 🇲🇷

---

## 📋 Description

Application web complète de gestion des membres de la **رابطة الطليعة الشبابية لبلدية ملزم تيشط**.  
Elle permet l'inscription, la consultation et l'administration des membres (hommes et femmes) avec support bilingue **Arabe / Français**.

---

## ✨ Fonctionnalités

- 👨 **Inscription des hommes** — formulaire avec vérification de doublons en temps réel
- 👩 **Inscription des femmes** — formulaire dédié
- 📊 **Statistiques** — compteurs hommes, femmes, total
- 🛡️ **Panel d'administration** — tableau de bord complet avec :
  - Graphiques par village et tranche d'âge
  - Filtre par situation d'emploi
  - Recherche en temps réel
  - Suppression de membres avec confirmation
  - Impression / export PDF
- 🌍 **Bilingue** — Arabe (RTL) / Français avec changement instantané
- 📱 **Responsive** — optimisé mobile et desktop

---

## 🛠️ Stack Technique

| Couche | Technologie |
|--------|-------------|
| **Backend** | Node.js + Express.js |
| **Base de données** | PostgreSQL (via Supabase) |
| **Driver BDD** | `pg` (node-postgres) |
| **Frontend** | HTML5 / CSS3 / JavaScript Vanilla |
| **Polices** | Google Fonts — Cairo, Amiri |
| **Hébergement** | Render.com |
| **BDD Cloud** | Supabase |

---

## 📁 Structure du Projet

```
rabita-melzam/
│
├── server.js                    # Serveur Express + API REST
├── package.json                 # Dépendances Node.js
├── .env                         # Variables d'environnement (non committé)
├── .env.example                 # Modèle des variables d'environnement
├── .gitignore
│
└── public/                      # Fichiers statiques servis par Express
    ├── index.html               # Page d'accueil + statistiques globales
    ├── inscription-hommes.html  # Formulaire d'inscription hommes
    ├── inscription-femmes.html  # Formulaire d'inscription femmes
    ├── liste-membres.html       # Page statistiques membres
    ├── admin.html               # Panel d'administration (protégé)
    └── lang.js                  # Système de traduction AR/FR (cookie)
```

---

## 🚀 Installation Locale

### Prérequis
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- Un compte **Supabase** (gratuit) pour la base de données

### Étapes

**1. Cloner le dépôt**
```bash
git clone https://github.com/VOTRE_NOM/rabita-melzam.git
cd rabita-melzam
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configurer les variables d'environnement**
```bash
cp .env.example .env
```
Ouvrir `.env` et renseigner l'URL de connexion Supabase :
```env
DATABASE_URL=postgresql://postgres:[MOT_DE_PASSE]@db.[REF].supabase.co:5432/postgres
NODE_ENV=development
PORT=3006
```

**4. Lancer le serveur**
```bash
npm start
# ou en mode développement avec rechargement automatique :
npm run dev
```

**5. Ouvrir dans le navigateur**
```
http://localhost:3006
```

> Les tables PostgreSQL sont créées **automatiquement** au premier démarrage.

---

## 🗄️ Base de Données

### Tables

#### `membreMelzem` — Membres hommes
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL | Identifiant auto-incrémenté |
| `nom` | VARCHAR(200) | Nom et prénom |
| `telephone` | VARCHAR(30) | Numéro (unique) |
| `age` | VARCHAR(20) | Tranche d'âge |
| `village` | VARCHAR(100) | Village / région |
| `situation` | VARCHAR(10) | `نعم` = travaille, `لا` = sans emploi |
| `date_inscription` | TIMESTAMP | Date d'inscription automatique |

#### `femmesMelzem` — Membres femmes
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL | Identifiant auto-incrémenté |
| `nom` | VARCHAR(200) | Nom et prénom |
| `telephone` | VARCHAR(30) | Numéro (unique) |
| `age` | VARCHAR(20) | Tranche d'âge |
| `village` | VARCHAR(100) | Village / région |
| `date_inscription` | TIMESTAMP | Date d'inscription automatique |

---

## 🔌 API REST

### Hommes

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/membreMelzem` | Liste tous les hommes |
| `POST` | `/api/membreMelzem` | Ajouter un homme |
| `DELETE` | `/api/membreMelzem/:id` | Supprimer un homme |

### Femmes

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/femmesMelzem` | Liste toutes les femmes |
| `POST` | `/api/femmesMelzem` | Ajouter une femme |
| `DELETE` | `/api/femmesMelzem/:id` | Supprimer une femme |

### Utilitaires

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/stats` | Statistiques globales |
| `GET` | `/api/check-doublon` | Vérification doublon temps réel |

### Exemple — Corps d'une requête POST `/api/membreMelzem`
```json
{
  "nom": "محمد ولد أحمد",
  "telephone": "22123456",
  "age": "18-25",
  "village": "جدة",
  "situation": "نعم"
}
```

### Exemple — Réponse succès
```json
{
  "success": true,
  "id": 42
}
```

### Exemple — Réponse erreur doublon (409)
```json
{
  "success": false,
  "message": "رقم الهاتف مسجل مسبقاً"
}
```

---

## ☁️ Déploiement en Production

### Étape 1 — Supabase (Base de données)

1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Récupérer l'URL de connexion :
   `Project Settings → Database → Connection string → URI`
4. L'URL ressemble à :
   ```
   postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
   ```

### Étape 2 — GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE_NOM/rabita-melzem.git
git branch -M main
git push -u origin main
```

### Étape 3 — Render.com (Hébergement)

1. Créer un compte sur [render.com](https://render.com)
2. **New +** → **Web Service**
3. Connecter le dépôt GitHub
4. Configurer le service :

| Champ | Valeur |
|-------|--------|
| **Name** | `rabita-melzem` |
| **Environment** | `Node` |
| **Region** | `Frankfurt (EU)` |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

5. Onglet **Environment** → ajouter les variables :

| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | `postgresql://postgres:***@db.***.supabase.co:5432/postgres` |
| `NODE_ENV` | `production` |

6. Cliquer **Create Web Service** → déploiement automatique ✅

### Mise à jour après modification
```bash
git add .
git commit -m "Description de la modification"
git push
# → Render redéploie automatiquement
```

---

## 🌍 Système de Traduction

Le fichier `public/lang.js` gère le bilinguisme via **cookie** (persistance entre les pages).

```js
// Changer la langue
toggleLang();           // bascule AR ↔ FR

// Traduire un élément
t('app.title')          // retourne la traduction selon la langue active

// Traduire automatiquement tous les éléments data-lang
translateDataLang();    // à appeler dans applyLang()
```

**Utilisation dans le HTML :**
```html
<!-- Traduction automatique via attribut data-lang -->
<label data-lang="village.jadda"></label>

<!-- Traduction via JavaScript -->
<span id="titre"></span>
<script>
  document.getElementById('titre').textContent = t('app.title');
</script>
```

---

## 🔐 Administration

L'accès au panel `/admin` est protégé par mot de passe.

> ⚠️ Le mot de passe est défini dans `admin.html` — variable `ADMIN_PWD`.  
> Pensez à le changer avant la mise en production.

---

## ⚠️ Limitations Plan Gratuit Render

| Aspect | Détail |
|--------|--------|
| **Sleep** | Le serveur se met en veille après 15 min d'inactivité |
| **Réveil** | ~30 secondes au premier accès après veille |
| **RAM** | 512 MB |
| **Heures/mois** | 750h (suffisant pour 1 service) |

💡 **Astuce** : Utiliser [UptimeRobot](https://uptimerobot.com) (gratuit) pour pinguer votre URL toutes les 14 minutes et éviter la mise en veille.

---

## 📦 Dépendances

```json
{
  "dependencies": {
    "dotenv":   "^16.4.5",   // Variables d'environnement
    "express":  "^4.18.2",   // Serveur web
    "pg":       "^8.11.3"    // Driver PostgreSQL
  },
  "devDependencies": {
    "nodemon": "^3.0.3"      // Rechargement auto en développement
  }
}
```

---

## 📄 Licence

Projet développé pour la **رابطة الطليعة الشبابية لبلدية ملزم تيشط**.  
Tous droits réservés © 2026.

---

