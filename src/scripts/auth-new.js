// Système d'authentification EcoRide avec Supabase
class AuthManager {
    constructor() {
        this.storageKey = 'ecoride_user';
    }

    // Connexion utilisateur avec base de données Supabase
    async login(email, password) {
        try {
            // Tentative de connexion via Supabase
            const result = await database.authenticateUser(email, password);
            
            if (result.success) {
                // Sauvegarder l'utilisateur dans localStorage
                localStorage.setItem(this.storageKey, JSON.stringify(result.user));
                
                // Déterminer la page de redirection selon le rôle
                let redirectUrl;
                if (result.user.role === 'admin') {
                    redirectUrl = 'admin-dashboard.html';
                } else if (result.user.role === 'conducteur') {
                    redirectUrl = 'comptecon-new.html';
                } else {
                    redirectUrl = 'comptevoyageur-new.html';
                }
                
                return {
                    success: true,
                    message: `Bienvenue ${result.user.prenom} !`,
                    redirectUrl: redirectUrl
                };
            } else {
                return {
                    success: false,
                    message: result.message || 'Échec de la connexion.'
                };
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            return {
                success: false,
                message: 'Erreur de connexion. Veuillez réessayer.'
            };
        }
    }

    // Inscription utilisateur avec base de données Supabase
    async register(userData) {
        try {
            const result = database.registerUser(userData);
            return result;
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            return {
                success: false,
                message: 'Erreur lors de l\'inscription. Veuillez réessayer.'
            };
        }
    }

    // Vérifier si l'utilisateur est connecté
    isLoggedIn() {
        const user = localStorage.getItem(this.storageKey);
        return user !== null;
    }

    // Obtenir les informations de l'utilisateur courant
    getCurrentUser() {
        const userStr = localStorage.getItem(this.storageKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    // Mettre à jour les informations de l'utilisateur courant
    updateCurrentUser(userData) {
        if (this.isLoggedIn()) {
            const currentUser = this.getCurrentUser();
            const updatedUser = { ...currentUser, ...userData };
            localStorage.setItem(this.storageKey, JSON.stringify(updatedUser));
        }
    }

    // Déconnexion
    logout() {
        localStorage.removeItem(this.storageKey);
        window.location.href = 'login.html';
    }

    // Vérifier l'autorisation pour une page
    requireAuth(requiredRole = null) {
        if (!this.isLoggedIn()) {
            alert('Vous devez être connecté pour accéder à cette page.');
            window.location.href = 'login.html';
            return false;
        }

        if (requiredRole) {
            const user = this.getCurrentUser();
            if (user.role !== requiredRole) {
                alert(`Cette page est réservée aux ${requiredRole}s.`);
                window.location.href = 'login.html';
                return false;
            }
        }

        return true;
    }

    // Redirection automatique selon le rôle
    redirectToDashboard() {
        if (this.isLoggedIn()) {
            const user = this.getCurrentUser();
            let redirectUrl;
            if (user.role === 'admin') {
                redirectUrl = 'admin-dashboard.html';
            } else if (user.role === 'conducteur') {
                redirectUrl = 'comptecon-new.html';
            } else {
                redirectUrl = 'comptevoyageur-new.html';
            }
            window.location.href = redirectUrl;
        }
    }
}

// Instance globale du gestionnaire d'authentification
const auth = new AuthManager();
