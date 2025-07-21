// Système d'authentification côté client pour remplacer PHP
class AuthSystem {
    constructor() {
        try {
            this.users = JSON.parse(localStorage.getItem('ecoride_users')) || {
                conducteurs: [],
                voyageurs: []
            };
            this.currentUser = JSON.parse(localStorage.getItem('ecoride_current_user')) || null;
        } catch (error) {
            console.warn('Erreur lors du chargement des données utilisateur:', error);
            this.users = { conducteurs: [], voyageurs: [] };
            this.currentUser = null;
        }
    }

    // Sauvegarder les données dans localStorage
    saveData() {
        try {
            localStorage.setItem('ecoride_users', JSON.stringify(this.users));
            localStorage.setItem('ecoride_current_user', JSON.stringify(this.currentUser));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        }
    }

    // Inscription
    signup(userData) {
        const { nom, prenom, email, password, role } = userData;
        
        // Vérifier si l'email existe déjà
        const existingUser = this.findUserByEmail(email);
        if (existingUser) {
            return { success: false, message: 'Cet email est déjà utilisé.' };
        }

        // Créer un nouvel utilisateur
        const newUser = {
            id: Date.now(), // ID simple basé sur le timestamp
            nom,
            prenom,
            email,
            password: btoa(password), // Encodage basique (ne pas utiliser en production)
            photo: null,
            dateCreation: new Date().toISOString()
        };

        // Ajouter à la bonne catégorie
        if (role === 'conducteur') {
            this.users.conducteurs.push(newUser);
        } else if (role === 'voyageur') {
            this.users.voyageurs.push(newUser);
        } else {
            return { success: false, message: 'Rôle invalide.' };
        }

        this.saveData();
        return { success: true, message: 'Inscription réussie ! Vous pouvez vous connecter.' };
    }

    // Connexion avec base de données simulée
    login(email, password) {
        console.log(`Tentative de connexion pour: ${email}`);
        
        // Utiliser la base de données simulée si disponible
        if (typeof database !== 'undefined') {
            const result = database.authenticateUser(email, password);
            if (result.success) {
                this.currentUser = result.user;
                this.saveData();
                console.log('Connexion réussie avec base de données:', this.currentUser);
                return { 
                    success: true, 
                    message: 'Connexion réussie !', 
                    redirectUrl: result.user.role === 'conducteur' ? 'comptecon.html' : 'comptevoyageur.html'
                };
            } else {
                console.log('Échec authentification base de données');
                return { success: false, message: result.message || 'Email ou mot de passe incorrect.' };
            }
        }

        // Fallback vers système localStorage si base de données non disponible
        const user = this.findUserByEmail(email);
        
        if (!user) {
            console.log('Utilisateur non trouvé');
            return { success: false, message: 'Email ou mot de passe incorrect.' };
        }

        console.log('Utilisateur trouvé:', user);

        // Vérifier le mot de passe (décodage basique)
        const storedPassword = atob(user.data.password);
        console.log('Mot de passe stocké:', storedPassword, 'Mot de passe saisi:', password);
        
        if (storedPassword !== password) {
            console.log('Mot de passe incorrect');
            return { success: false, message: 'Email ou mot de passe incorrect.' };
        }

        // Connexion réussie
        this.currentUser = {
            ...user.data,
            role: user.role
        };
        this.saveData();

        console.log('Connexion réussie. Utilisateur connecté:', this.currentUser);

        return { 
            success: true, 
            message: 'Connexion réussie !', 
            redirectUrl: user.role === 'conducteur' ? 'comptecon.html' : 'comptevoyageur.html'
        };
    }

    // Déconnexion
    logout() {
        this.currentUser = null;
        localStorage.removeItem('ecoride_current_user');
        return { success: true, message: 'Déconnexion réussie.' };
    }

    // Trouver un utilisateur par email
    findUserByEmail(email) {
        // Chercher parmi les conducteurs
        const conducteur = this.users.conducteurs.find(user => user.email === email);
        if (conducteur) {
            return { data: conducteur, role: 'conducteur' };
        }

        // Chercher parmi les voyageurs
        const voyageur = this.users.voyageurs.find(user => user.email === email);
        if (voyageur) {
            return { data: voyageur, role: 'voyageur' };
        }

        return null;
    }

    // Vérifier si l'utilisateur est connecté
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Obtenir l'utilisateur actuel
    getCurrentUser() {
        return this.currentUser;
    }

    // Mettre à jour le profil utilisateur
    updateProfile(userData) {
        if (!this.currentUser) {
            return { success: false, message: 'Utilisateur non connecté.' };
        }

        const userArray = this.currentUser.role === 'conducteur' 
            ? this.users.conducteurs 
            : this.users.voyageurs;

        const userIndex = userArray.findIndex(user => user.id === this.currentUser.id);
        if (userIndex === -1) {
            return { success: false, message: 'Utilisateur non trouvé.' };
        }

        // Mettre à jour les données
        userArray[userIndex] = { ...userArray[userIndex], ...userData };
        this.currentUser = { ...this.currentUser, ...userData };

        this.saveData();
        return { success: true, message: 'Profil mis à jour avec succès.' };
    }

    // Initialiser les utilisateurs de la base de données
    initTestUsers() {
        if (this.users.conducteurs.length === 0 && this.users.voyageurs.length === 0) {
            console.log('Initialisation des utilisateurs de la base de données...');
            
            // Utilisateurs réels de la base de données ecoride
            // Table conducteurs
            this.users.conducteurs.push({
                id: 1,
                nom: 'Dupont',
                prenom: 'Paul',
                email: 'pauldupont@hotmail.fr',
                password: btoa('Mavoiture6+'), // Mot de passe en clair pour le test
                photo: '../uploads/687ce8683a623_photo utilisateur.png',
                dateCreation: '2025-07-21'
            });

            this.users.conducteurs.push({
                id: 2,
                nom: 'Rive',
                prenom: 'Jean', 
                email: 'jeanrive@hotmail.fr',
                password: btoa('password123'), // Mot de passe simulé
                photo: '../uploads/687cf2553ace9_photo utilisateur.png',
                dateCreation: '2025-07-21'
            });

            // Table voyageurs
            this.users.voyageurs.push({
                id: 1,
                nom: 'Pop',
                prenom: 'Julie',
                email: 'juliepop@hotmail.fr', 
                password: btoa('Monvoyage6+'), // Mot de passe en clair pour le test
                photo: 'assets/voyageur_1.png',
                dateCreation: '2025-07-21'
            });

            this.saveData();
            console.log('Utilisateurs de la base de données chargés:', this.users);
        }
    }

    // Fonction de debug pour afficher les données
    debugShowData() {
        console.log('=== DEBUG AUTH SYSTEM ===');
        console.log('Utilisateurs:', this.users);
        console.log('Utilisateur connecté:', this.currentUser);
        console.log('========================');
    }
}

// Instance globale du système d'authentification
const auth = new AuthSystem();

// Initialiser quelques utilisateurs de test (en développement)
auth.initTestUsers();

// Fonction pour mettre à jour l'interface utilisateur selon l'état de connexion
function updateAuthUI() {
    const isLoggedIn = auth.isLoggedIn();
    const currentUser = auth.getCurrentUser();
    
    // Mettre à jour les liens de navigation
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownContent && isLoggedIn) {
        dropdownContent.innerHTML = `
            <a href="src/pages/${currentUser.role === 'conducteur' ? 'comptecon' : 'comptevoyageur'}.html">Mon compte</a>
            <a href="#" onclick="handleLogout()">Déconnexion</a>
        `;
    }
}

// Fonction de déconnexion
function handleLogout() {
    auth.logout();
    updateAuthUI();
    window.location.href = 'index.html';
}

// Mettre à jour l'interface au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
});

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { auth, AuthSystem };
}
