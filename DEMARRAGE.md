# 🚀 Démarrage Rapide

## Étapes pour lancer l'application

### 1️⃣ Configurer la base de données

Ouvrez phpMyAdmin et exécutez le fichier `database.sql` :

```bash
# OU via ligne de commande :
mysql -u root -pzenvour association_db < database.sql
```

### 2️⃣ Démarrer le serveur

```bash
node server.js
```

### 3️⃣ Accéder à l'application

Ouvrez votre navigateur : **http://localhost:3000**

---

## 📱 Pages disponibles

- **Accueil** : http://localhost:3000
- **Inscription Hommes** : http://localhost:3000/inscription-hommes.html
- **Inscription Femmes** : http://localhost:3000/inscription-femmes.html  
- **Nouveautés** : http://localhost:3000/nouveautes.html
- **Admin** : http://localhost:3000/admin.html

---

## ✅ Fonctionnalités

### Inscription Hommes
- Nom, Situation, Téléphone
- **Montant automatique** : 2000 UM (travaille) / 1000 UM (sans emploi)

### Inscription Femmes
- Nom, Téléphone
- **Sans montant ni situation**

### Nouveautés
- Galerie d'images
- Clic pour agrandir

### Administration
- Ajouter des images avec titre
- Upload et aperçu

---

## 📝 Note

Le logo `ajjj.jpeg` s'affiche automatiquement sur la page d'accueil.
