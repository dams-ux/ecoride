# Guide de Configuration Supabase pour EcoRide

## 🚀 Configuration de la base de données Supabase

### 1. Créer un projet Supabase
1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte et un nouveau projet
3. Choisir un nom pour votre projet (ex: "ecoride-prod")
4. Noter votre **URL du projet** et votre **clé API publique**

### 2. Configurer la base de données
1. Dans votre tableau de bord Supabase, aller dans "SQL Editor"
2. Copier et coller tout le contenu du fichier `database/setup_supabase.sql`
3. Exécuter le script pour créer toutes les tables

### 3. Configurer les clés dans le code
Mettre à jour le fichier `src/scripts/supabase-client.js` :

```javascript
// Remplacer ces valeurs par vos vraies clés Supabase
this.SUPABASE_URL = 'https://votre-project-id.supabase.co';
this.SUPABASE_ANON_KEY = 'votre-cle-api-publique-supabase';
```

### 4. Configuration de la sécurité (Row Level Security)
Les politiques de sécurité sont déjà configurées dans le script SQL pour :
- ✅ Les utilisateurs ne peuvent voir que leurs propres données
- ✅ Les conducteurs peuvent gérer leurs véhicules et trajets
- ✅ Tous peuvent voir les trajets publics
- ✅ Système de réservations sécurisé

### 5. Test de la configuration
1. Ouvrir `signup-new.html`
2. Créer un compte conducteur
3. Se connecter via `login.html`
4. Vérifier que les données apparaissent dans Supabase

## 📁 Structure des fichiers mise à jour

### Fichiers créés/modifiés :
- ✅ `src/scripts/supabase-client.js` - Client API Supabase
- ✅ `src/scripts/auth-new.js` - Authentification avec Supabase
- ✅ `src/pages/signup-new.html` - Inscription avec base de données
- ✅ `src/pages/comptecon-new.html` - Compte conducteur avec Supabase
- ✅ `database/setup_supabase.sql` - Structure de base de données
- ✅ `src/pages/login.html` - Connexion mise à jour

### Fonctionnalités disponibles :
- 🔐 **Inscription/Connexion** avec vraie base de données
- 🚗 **Gestion des véhicules** persistante
- 📍 **Création de trajets** avec données réelles  
- 📅 **Système de réservations** fonctionnel
- ⭐ **Système d'avis** entre utilisateurs
- 📊 **Statistiques utilisateur** en temps réel
- 📱 **Interface responsive** et moderne

## 🌐 Déploiement sur GitHub Pages

### Option 1: Configuration simple
1. Pousser le code sur GitHub
2. Activer GitHub Pages dans les paramètres
3. Configurer les clés Supabase dans `supabase-client.js`

### Option 2: Variables d'environnement (plus sécurisé)
Pour cacher les clés sensibles, utiliser GitHub Actions :

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Replace environment variables
        run: |
          sed -i "s/votre-project.supabase.co/${{ secrets.SUPABASE_URL }}/g" src/scripts/supabase-client.js
          sed -i "s/votre-clé-anonyme/${{ secrets.SUPABASE_ANON_KEY }}/g" src/scripts/supabase-client.js
```

## 📝 Avantages de cette solution

✅ **Compatible GitHub Pages** - Pas de serveur nécessaire  
✅ **Base de données réelle** - PostgreSQL via Supabase  
✅ **Inscription fonctionnelle** - Nouveaux utilisateurs peuvent s'inscrire  
✅ **API REST automatique** - Supabase génère l'API  
✅ **Sécurité intégrée** - Row Level Security  
✅ **Temps réel** - Mises à jour automatiques  
✅ **Gratuit** - Jusqu'à 50 000 requêtes/mois  
✅ **Scalable** - Peut gérer des milliers d'utilisateurs  

## 🔄 Prochaines étapes

1. **Configurer Supabase** avec vos clés
2. **Tester l'inscription** de nouveaux utilisateurs
3. **Créer une page voyageur** similaire à la page conducteur
4. **Mettre à jour la page covoiturage** pour utiliser Supabase
5. **Déployer sur GitHub Pages**

Cette solution vous donne une vraie application avec base de données qui fonctionne parfaitement sur GitHub Pages ! 🚀
