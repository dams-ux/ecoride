# 🔄 Guide de Migration - Consolidation des Bases de Données

## 📊 **Situation Actuelle**

Vous avez **2 systèmes de bases de données** dans votre projet :

### ❌ **Base MySQL (À SUPPRIMER)** - `database/ecoride_mysql.sql`
- Structure avec tables séparées : `conducteurs` + `voyageurs`  
- **Problème :** Incompatible avec GitHub Pages (nécessite serveur PHP)
- **Utilisateurs existants :**
  - Paul Dupont (conducteur) : `pauldupont@hotmail.fr` / `Mavoiture6+`
  - Julie Pop (voyageur) : `juliepop@hotmail.fr` / `Monvoyage6+`

### ✅ **Base Supabase/PostgreSQL (À UTILISER)** - `database/setup_supabase.sql`  
- Structure unifiée : table `users` avec rôles
- **Compatible GitHub Pages** (API REST)
- **Utilisateurs migrés :**
  - **Admin :** `admin@ecoride.fr` / `ecoride2025`
  - **Manager :** `robert@ecoride.fr` / `voiture`
  - **Conducteur :** `pauldupont@hotmail.fr` / `Mavoiture6+`
  - **Voyageur :** `juliepop@hotmail.fr` / `Monvoyage6+`

## 🎯 **Actions à effectuer**

### 1. **Utiliser UNIQUEMENT Supabase**
✅ J'ai **mis à jour** `setup_supabase.sql` avec tous vos utilisateurs existants
✅ L'admin peut maintenant se connecter : `admin@ecoride.fr` / `ecoride2025`
✅ Paul et Julie gardent leurs identifiants actuels

### 2. **Supprimer l'ancienne base MySQL**
```powershell
# Supprimer les fichiers de l'ancienne base
Remove-Item "database\ecoride_mysql.sql"
Remove-Item "ecoride.sql" -ErrorAction SilentlyContinue
```

### 3. **Configuration Supabase**
1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter le script **`database/setup_supabase.sql`**
3. Configurer les clés dans **`src/scripts/supabase-client.js`**

## 👥 **Comptes de Test Disponibles**

### 🔧 **Administrateurs**
| Email | Mot de passe | Rôle |
|-------|-------------|------|
| `admin@ecoride.fr` | `ecoride2025` | Admin |
| `robert@ecoride.fr` | `voiture` | Manager |

### 🚗 **Conducteurs**  
| Email | Mot de passe | Rôle |
|-------|-------------|------|
| `pauldupont@hotmail.fr` | `Mavoiture6+` | Conducteur |
| `jeanrive@hotmail.fr` | *(hash existant)* | Conducteur |

### 👥 **Voyageurs**
| Email | Mot de passe | Rôle |
|-------|-------------|------|
| `juliepop@hotmail.fr` | `Monvoyage6+` | Voyageur |
| `sophie.martin@gmail.com` | *(hash existant)* | Voyageur |

## ✅ **Avantages de cette migration**

🎯 **Une seule base de données** - Plus de confusion  
🔐 **Système d'authentification unifié** - Login unique pour tous  
📱 **Compatible GitHub Pages** - Déploiement facile  
🚀 **API REST automatique** - Généré par Supabase  
🔒 **Sécurité intégrée** - Row Level Security  
💾 **Sauvegarde automatique** - Gérée par Supabase  

## 🔄 **Migration des fichiers code**

### Fichiers à utiliser (✅ Supabase) :
- `src/scripts/supabase-client.js`
- `src/scripts/auth-new.js`  
- `src/pages/signup-new.html`
- `src/pages/comptecon-new.html`
- `src/pages/comptevoyageur-new.html`
- `src/pages/covoiturage-new.html`

### Fichiers à remplacer (❌ MySQL) :
- `src/scripts/database.js` → **REMPLACÉ** par `supabase-client.js`
- `src/scripts/auth.js` → **REMPLACÉ** par `auth-new.js`
- `src/pages/signup.html` → **REMPLACÉ** par `signup-new.html`

## 🚀 **Prochaines étapes**

1. **Configurer Supabase** avec le script mis à jour
2. **Tester la connexion admin** : `admin@ecoride.fr` / `ecoride2025`  
3. **Tester Paul conducteur** : `pauldupont@hotmail.fr` / `Mavoiture6+`
4. **Tester Julie voyageur** : `juliepop@hotmail.fr` / `Monvoyage6+`
5. **Supprimer les anciens fichiers MySQL**
6. **Déployer sur GitHub Pages**

## ⚡ **Résumé**

**Avant :** 2 bases incompatibles + confusion  
**Après :** 1 base moderne + tous vos utilisateurs préservés + GitHub Pages compatible

Vos utilisateurs Paul et Julie peuvent continuer à utiliser leurs identifiants habituels ! 🎉
