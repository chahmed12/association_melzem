# Guide d'Installation - Application Association

## 📋 Prérequis

1. **XAMPP** installé avec MySQL en cours d'exécution
2. **Node.js** installé (version 14 ou supérieure)
3. **Navigateur web** moderne

## 🚀 Installation

### 1. Configuration de la base de données

1. Ouvrez **phpMyAdmin** (http://localhost/phpmyadmin)
2. Créez une base de données nommée `association_db`
3. Importez le fichier `database.sql` dans cette base de données

**OU** exécutez les commandes SQL suivantes :

```sql
CREATE DATABASE IF NOT EXISTS association_db;
USE association_db;
```

Puis copiez-collez le contenu du fichier `database.sql`.

### 2. Installation des dépendances Node.js

```bash
cd /home/chahmed/association
npm install
```

### 3. Démarrage du serveur

```bash
node server.js
```

Vous devriez voir :
```
✅ Connecté à MySQL avec succès !
🚀 Serveur lancé sur http://localhost:3000
```

## 📱 Utilisation

### Pages disponibles :

- **Page d'accueil** : http://localhost:3000
- **Inscription Hommes** : http://localhost:3000/inscription-hommes.html
- **Inscription Femmes** : http://localhost:3000/inscription-femmes.html
- **Nouveautés** : http://localhost:3000/nouveautes.html
- **Administration** : http://localhost:3000/admin.html

## 🎨 Fonctionnalités

### ✅ Inscription Hommes
- Nom complet
- Situation (travaille / sans emploi)
- Téléphone
- **Montant calculé automatiquement** :
  - 2000 UM si travaille
  - 1000 UM si sans emploi

### ✅ Inscription Femmes
- Nom complet
- Téléphone
- **Pas de montant ni de situation**

### ✅ Galerie de Nouveautés
- Affichage des images en grille
- Clic pour agrandir
- Tri par date (plus récent en premier)

### ✅ Administration
- Ajouter des nouveautés avec images
- Aperçu avant upload
- Gestion des titres

## 🗂️ Structure des fichiers

```
association/
├── index.html                 # Page d'accueil avec logo
├── inscription-hommes.html    # Formulaire hommes
├── inscription-femmes.html    # Formulaire femmes
├── nouveautes.html           # Galerie d'images
├── admin.html                # Interface d'administration
├── server.js                 # Serveur backend
├── database.sql              # Script SQL
├── package.json              # Dépendances
└── public/
    ├── images/
    │   └── logo.png          # Logo de l'association
    └── uploads/              # Images uploadées
        ├── event1.png
        └── event2.png
```

## 🔧 Configuration

Si vous devez changer le mot de passe MySQL, modifiez dans `server.js` :

```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'votre_mot_de_passe',  // Changez ici
    database: 'association_db'
});
```

## 📝 Notes

- Le logo s'affiche automatiquement s'il existe dans `/public/images/logo.png`
- Les images sont stockées dans `/public/uploads/`
- Les inscriptions sont sauvegardées dans MySQL
- Format d'images supporté : PNG, JPG, GIF

## 🎯 Prochaines étapes

Pour personnaliser davantage :
1. Remplacez le logo par le vôtre dans `public/images/logo.png`
2. Ajoutez des nouveautés via http://localhost:3000/admin.html
3. Personnalisez les couleurs dans les fichiers HTML (classes Tailwind)
