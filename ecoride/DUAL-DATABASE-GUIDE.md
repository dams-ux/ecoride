# 🔄 Guide d'utilisation des 2 bases de données

## 📋 **Approche recommandée : Les deux !**

### 🏠 **Phase 1 : Développement local avec MySQL**

1. **Installer XAMPP/WAMP** avec phpMyAdmin
2. **Importer** `database/ecoride_mysql.sql` dans phpMyAdmin
3. **Développer et tester** en local avec vos données familières
4. **Utiliser** les anciens scripts PHP si besoin

### 🌐 **Phase 2 : Production avec Supabase**

1. **Créer projet Supabase** quand prêt pour la production
2. **Migrer les données** vers `database/setup_supabase.sql`
3. **Déployer** sur GitHub Pages
4. **Utiliser** les nouveaux scripts JavaScript

## 🔧 **Configuration phpMyAdmin (Local)**

### Étapes d'installation

1. **Télécharger XAMPP** : [Site officiel XAMPP](https://www.apachefriends.org/)
2. **Démarrer Apache + MySQL** dans XAMPP
3. **Ouvrir phpMyAdmin** : [Interface locale](http://localhost/phpmyadmin)
4. **Créer base** : "ecoride"
5. **Importer** `ecoride_mysql.sql` (base principale)
6. **⚠️ IMPORTANT : Importer** `mysql_complements.sql` (compléments admin)

### Comptes disponibles dans MySQL

| **Utilisateur** | **Email** | **Hash (dans base)** | **Mot de passe réel** |
|-----------------|-----------|---------------------|----------------------|
| **🔧 Admin** | `admin@ecoride.fr` | `$2b$10$fEo...` | `ecoride2025` |
| **🔧 Manager** | `robert@ecoride.fr` | `$2b$10$92I...` | `voiture` |
| **Paul** (conducteur) | `pauldupont@hotmail.fr` | `$2y$10$IQj...` | `Mavoiture6+` |
| **Julie** (voyageur) | `juliepop@hotmail.fr` | `$2y$10$jhm...` | `Monvoyage6+` |
| **Jean** (conducteur) | `jeanrive@hotmail.fr` | `$2y$10$2xz...` | *(à définir)* |

## ⚙️ **Scripts à utiliser selon l'environnement**

### 🏠 **Développement local (MySQL)**

- `src/scripts/database.js` (simulation actuelle)
- `src/scripts/auth.js` (système actuel)
- Pages HTML existantes

### 🌐 **Production (Supabase)**

- `src/scripts/supabase-client.js` ✅
- `src/scripts/auth-new.js` ✅  
- Pages HTML avec suffix `-new` ✅

## 🎯 **Avantages de chaque approche**

### MySQL + phpMyAdmin

✅ **Interface familière** - phpMyAdmin est intuitif  
✅ **Contrôle total** - Vos données restent chez vous  
✅ **Débogage facile** - Voir directement les requêtes SQL  
✅ **Hors-ligne** - Pas besoin d'Internet pour développer  

### Supabase

✅ **GitHub Pages** - Déploiement automatique  
✅ **API REST** - Pas besoin de backend PHP  
✅ **Sécurité** - Row Level Security intégré  
✅ **Scalabilité** - Supporte des milliers d'utilisateurs  

## 🚀 **Workflow recommandé**

1. **Développer** avec MySQL en local
2. **Tester** avec phpMyAdmin
3. **Finaliser** les fonctionnalités
4. **Migrer** vers Supabase pour la production
5. **Déployer** sur GitHub Pages

## 📝 **Notes importantes**

- **Les mots de passe** sont hachés différemment (bcrypt vs PHP)
- **Structure légèrement différente** (tables séparées vs table unique)
- **Scripts JavaScript** adaptés à chaque base
- **Migration facile** d'une base à l'autre

Cette approche vous donne **le meilleur des deux mondes** ! 🎉
