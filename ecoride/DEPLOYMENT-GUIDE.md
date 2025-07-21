# 🚀 Guide de déploiement GitHub Pages

## Étapes pour déployer votre site ECORIDE sur GitHub Pages

### 1. Préparation du repository

1. **Commitez tous vos changements** :
   ```bash
   git add .
   git commit -m "Conversion du site PHP vers statique pour GitHub Pages"
   git push origin main
   ```

2. **Vérifiez que le fichier `index.html` est à la racine** du projet (c'est déjà fait).

### 2. Activation de GitHub Pages

1. Allez sur votre repository GitHub : `https://github.com/dams-ux/DP-Project`
2. Cliquez sur l'onglet **"Settings"**
3. Descendez jusqu'à la section **"Pages"** dans le menu de gauche
4. Dans **"Source"**, sélectionnez **"Deploy from a branch"**
5. Choisissez la branche **"main"**
6. Sélectionnez **"/ (root)"** comme dossier
7. Cliquez sur **"Save"**

### 3. Accès au site

Votre site sera accessible à l'adresse :
```
https://dams-ux.github.io/DP-Project/
```

⚠️ **Note** : Il peut falloir quelques minutes pour que le site soit disponible après la première activation.

### 4. Mises à jour automatiques

Désormais, chaque fois que vous ferez un `git push` vers la branche `main`, GitHub Pages mettra automatiquement à jour votre site.

### 5. Configuration du domaine personnalisé (optionnel)

Si vous avez un nom de domaine :
1. Dans les paramètres Pages, ajoutez votre domaine dans **"Custom domain"**
2. Créez un fichier `CNAME` à la racine du projet avec votre domaine

### 6. Test final

Une fois déployé, testez ces fonctionnalités :
- ✅ Navigation entre les pages
- ✅ Inscription d'un nouveau compte
- ✅ Connexion avec les comptes de test
- ✅ Fonctionnalités conducteur/voyageur

---

**C'est tout ! Votre site EcoRide est maintenant en ligne ! 🎉**
