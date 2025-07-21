# ECORIDE - Version Statique

## 🌍 Migration vers un site statique déployable

Ce projet a été converti d'une application PHP avec base de données MySQL vers une application web statique utilisant uniquement HTML, CSS et JavaScript. Cette migration permet de déployer facilement le site sur GitHub Pages ou toute autre plateforme d'hébergement statique.

## 🔄 Changements apportés

### Fichiers convertis :
- `Acceuil.php` → `index.html` (page d'accueil principale)
- `login.php` → `login.html` 
- `signup.php` → `signup.html`
- `covoiturage.php` → `covoiturage.html`
- `comptecon.php` → `comptecon.html`
- `comptevoyageur.php` → `comptevoyageur.html`

### Nouvelles fonctionnalités JavaScript :
- **Système d'authentification client** (`src/scripts/auth.js`)
  - Gestion des utilisateurs (conducteurs/voyageurs)
  - Connexion/inscription avec validation
  - Sessions simulées avec localStorage
- **Données persistantes** 
  - Stockage local des profils utilisateurs
  - Gestion des véhicules et trajets
  - Historique des réservations

### Fonctionnalités remplacées :
- ❌ Base de données MySQL → ✅ localStorage
- ❌ Sessions PHP → ✅ localStorage + JavaScript
- ❌ Traitement côté serveur → ✅ Traitement côté client
- ❌ PDO/MySQL → ✅ Données JSON en mémoire

## 🚀 Déploiement

### GitHub Pages :
1. Poussez le code vers votre repository GitHub
2. Activez GitHub Pages dans les paramètres du repository
3. Sélectionnez la branche `main` comme source
4. Le site sera accessible à `https://username.github.io/repository-name/`

### Autres plateformes :
- **Netlify** : Glissez-déposez le dossier du projet
- **Vercel** : Connectez votre repository GitHub
- **Firebase Hosting** : Utilisez `firebase deploy`

## 📁 Structure du projet

```
ecoride/
├── index.html                    # Page d'accueil principale
├── src/
│   ├── pages/
│   │   ├── login.html           # Connexion
│   │   ├── signup.html          # Inscription
│   │   ├── covoiturage.html     # Liste des trajets
│   │   ├── comptecon.html       # Compte conducteur
│   │   └── comptevoyageur.html  # Compte voyageur
│   ├── scripts/
│   │   ├── auth.js              # Système d'authentification
│   │   ├── fonction.js          # Fonctions utilitaires
│   │   └── trajet.js            # Gestion des trajets
│   ├── styles/                  # Fichiers CSS existants
│   └── uploads/                 # Images utilisateurs
```

## 🔧 Fonctionnalités disponibles

### Pour les visiteurs :
- ✅ Navigation sur le site
- ✅ Recherche de trajets
- ✅ Inscription comme conducteur ou voyageur
- ✅ Connexion avec comptes de test

### Pour les conducteurs :
- ✅ Gestion de profil avec photo
- ✅ Ajout/suppression de véhicules (max 3)
- ✅ Création de trajets
- ✅ Suivi des trajets créés

### Pour les voyageurs :
- ✅ Gestion de profil avec photo
- ✅ Réservation de trajets (simulation)
- ✅ Historique des trajets
- ✅ Système de notation et commentaires

## 🧪 Comptes de test

### Conducteur :
- **Email :** jean.dupont@test.com
- **Mot de passe :** password123

### Voyageur :
- **Email :** marie.martin@test.com
- **Mot de passe :** password123

## 🎯 Limitations de la version statique

- **Données temporaires** : Les données sont stockées localement et disparaissent si on vide le cache du navigateur
- **Pas de synchronisation** : Chaque utilisateur ne voit que ses propres données
- **Sécurité basique** : L'authentification est simulée (ne pas utiliser en production)
- **Pas de messagerie** : La fonction de contact entre utilisateurs est simulée

## 🔜 Améliorations possibles

- Intégration d'une base de données cloud (Firebase, Supabase)
- API REST pour la synchronisation des données
- Système de messagerie en temps réel
- Notifications push
- Géolocalisation avancée
- Paiements intégrés

## 📝 Notes techniques

- Le site utilise le localStorage pour persister les données
- L'authentification est purement côté client (à des fins de démonstration)
- Les trajets sont générés avec des données d'exemple
- Compatible avec tous les navigateurs modernes
- Responsive design pour mobile et desktop

---

**Prêt à déployer ! 🚀**

Le site peut maintenant être hébergé sur n'importe quelle plateforme d'hébergement statique sans nécessiter de serveur PHP ou de base de données.
