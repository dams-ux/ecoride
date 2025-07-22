// Client de base de données Supabase pour EcoRide
class SupabaseClient {
    constructor() {
        // Configuration Supabase - À remplacer par vos vraies clés
        this.SUPABASE_URL = 'https://votre-project.supabase.co';
        this.SUPABASE_ANON_KEY = 'votre-clé-anonyme';
        
        this.apiUrl = `${this.SUPABASE_URL}/rest/v1`;
        this.authUrl = `${this.SUPABASE_URL}/auth/v1`;
        
        this.headers = {
            'Content-Type': 'application/json',
            'apikey': this.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${this.SUPABASE_ANON_KEY}`
        };
        
        console.log('Client Supabase initialisé');
    }

    // Méthode générique pour les requêtes API
    async apiRequest(endpoint, method = 'GET', data = null) {
        try {
            const config = {
                method,
                headers: this.headers
            };
            
            if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
                config.body = JSON.stringify(data);
            }
            
            const response = await fetch(`${this.apiUrl}${endpoint}`, config);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP Error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentification utilisateur
    async authenticateUser(email, password) {
        try {
            // Vérification du compte admin de test
            if (email === 'admin@ecoride.com' && password === 'admin123') {
                return {
                    success: true,
                    user: {
                        id: 'admin-001',
                        nom: 'EcoRide',
                        prenom: 'Admin',
                        email: 'admin@ecoride.com',
                        photo: null,
                        role: 'admin'
                    }
                };
            }
            
            // Rechercher l'utilisateur par email
            const users = await this.apiRequest(`/users?email=eq.${email}&select=*`);
            
            if (users.length === 0) {
                return { success: false, message: 'Email ou mot de passe incorrect.' };
            }
            
            const user = users[0];
            
            // Vérification simple du mot de passe (en production, utiliser une méthode sécurisée)
            if (await this.verifyPassword(password, user.password_hash)) {
                return {
                    success: true,
                    user: {
                        id: user.id,
                        nom: this.capitalizeFirst(user.nom),
                        prenom: this.capitalizeFirst(user.prenom),
                        email: user.email,
                        photo: user.photo,
                        role: user.role
                    }
                };
            } else {
                return { success: false, message: 'Email ou mot de passe incorrect.' };
            }
        } catch (error) {
            console.error('Erreur authentification:', error);
            return { success: false, message: 'Erreur de connexion.' };
        }
    }

    // Inscription d'un nouvel utilisateur
    async registerUser(userData) {
        try {
            // Vérifier si l'email existe déjà
            const existingUsers = await this.apiRequest(`/users?email=eq.${userData.email}`);
            if (existingUsers.length > 0) {
                return { success: false, message: 'Cet email est déjà utilisé.' };
            }

            // Créer le hash du mot de passe (version simplifiée)
            const passwordHash = await this.hashPassword(userData.password);
            
            const newUser = {
                nom: userData.nom.toLowerCase(),
                prenom: userData.prenom.toLowerCase(),
                email: userData.email.toLowerCase(),
                password_hash: passwordHash,
                role: userData.role,
                telephone: userData.telephone || null,
                photo: null
            };

            const result = await this.apiRequest('/users', 'POST', newUser);
            
            return { 
                success: true, 
                message: 'Inscription réussie !',
                user: result[0]
            };
        } catch (error) {
            console.error('Erreur inscription:', error);
            return { success: false, message: 'Erreur lors de l\'inscription.' };
        }
    }

    // Obtenir les trajets d'un conducteur
    async getConducteurTrajets(conducteurId) {
        try {
            return await this.apiRequest(`/trajets?conducteur_id=eq.${conducteurId}&select=*,vehicules(*)`);
        } catch (error) {
            console.error('Erreur trajets conducteur:', error);
            return [];
        }
    }

    // Obtenir les véhicules d'un conducteur
    async getConducteurVehicules(conducteurId) {
        try {
            return await this.apiRequest(`/vehicules?conducteur_id=eq.${conducteurId}`);
        } catch (error) {
            console.error('Erreur véhicules conducteur:', error);
            return [];
        }
    }

    // Obtenir tous les trajets disponibles
    async getTrajetsDisponibles() {
        try {
            const trajets = await this.apiRequest(`/trajets?statut=eq.actif&places_disponibles=gt.0&select=*,users!trajets_conducteur_id_fkey(nom,prenom),vehicules(*)`);
            
            return trajets.map(trajet => ({
                ...trajet,
                conducteur_nom: trajet.users ? 
                    `${this.capitalizeFirst(trajet.users.prenom)} ${this.capitalizeFirst(trajet.users.nom)}` : 
                    'Inconnu',
                vehicule: trajet.vehicules
            }));
        } catch (error) {
            console.error('Erreur trajets disponibles:', error);
            return [];
        }
    }

    // Rechercher des trajets avec filtres
    async searchTrajets(filters) {
        try {
            let query = '/trajets?statut=eq.actif&places_disponibles=gt.0';
            
            if (filters.depart) {
                query += `&depart=ilike.*${filters.depart}*`;
            }
            
            if (filters.arrivee) {
                query += `&arrivee=ilike.*${filters.arrivee}*`;
            }
            
            if (filters.date) {
                const date = new Date(filters.date);
                const dateStr = date.toISOString().split('T')[0];
                query += `&date_depart=gte.${dateStr}&date_depart=lt.${dateStr}T23:59:59`;
            }
            
            if (filters.passagers) {
                query += `&places_disponibles=gte.${filters.passagers}`;
            }
            
            query += '&select=*,users!trajets_conducteur_id_fkey(nom,prenom,photo),vehicules(*)';
            
            const trajets = await this.apiRequest(query);
            
            return trajets.map(trajet => ({
                ...trajet,
                conducteur_nom: trajet.users ? 
                    `${this.capitalizeFirst(trajet.users.prenom)} ${this.capitalizeFirst(trajet.users.nom)}` : 
                    'Inconnu',
                conducteur_photo: trajet.users?.photo,
                vehicule: trajet.vehicules
            }));
        } catch (error) {
            console.error('Erreur recherche trajets:', error);
            return [];
        }
    }

    // Ajouter un nouveau trajet
    async addTrajet(trajetData) {
        try {
            const result = await this.apiRequest('/trajets', 'POST', trajetData);
            return { 
                success: true, 
                message: 'Trajet créé avec succès.',
                trajet: result[0]
            };
        } catch (error) {
            console.error('Erreur ajout trajet:', error);
            return { success: false, message: 'Erreur lors de la création du trajet.' };
        }
    }

    // Ajouter un nouveau véhicule
    async addVehicule(vehiculeData) {
        try {
            const result = await this.apiRequest('/vehicules', 'POST', vehiculeData);
            return { 
                success: true, 
                message: 'Véhicule ajouté avec succès.',
                vehicule: result[0]
            };
        } catch (error) {
            console.error('Erreur ajout véhicule:', error);
            return { success: false, message: 'Erreur lors de l\'ajout du véhicule.' };
        }
    }

    // Supprimer un trajet
    async deleteTrajet(trajetId) {
        try {
            await this.apiRequest(`/trajets?id=eq.${trajetId}`, 'DELETE');
            return { success: true, message: 'Trajet supprimé avec succès.' };
        } catch (error) {
            console.error('Erreur suppression trajet:', error);
            return { success: false, message: 'Erreur lors de la suppression.' };
        }
    }

    // Supprimer un véhicule
    async deleteVehicule(vehiculeId) {
        try {
            await this.apiRequest(`/vehicules?id=eq.${vehiculeId}`, 'DELETE');
            return { success: true, message: 'Véhicule supprimé avec succès.' };
        } catch (error) {
            console.error('Erreur suppression véhicule:', error);
            return { success: false, message: 'Erreur lors de la suppression.' };
        }
    }

    // Réserver une place
    async reserverPlace(trajetId, voyageurId, nbPlaces) {
        try {
            // Vérifier les places disponibles
            const trajets = await this.apiRequest(`/trajets?id=eq.${trajetId}`);
            if (trajets.length === 0) {
                return { success: false, message: 'Trajet non trouvé.' };
            }
            
            const trajet = trajets[0];
            if (trajet.places_disponibles < nbPlaces) {
                return { success: false, message: 'Places insuffisantes disponibles.' };
            }

            // Vérifier si déjà réservé
            const reservationsExistantes = await this.apiRequest(
                `/reservations?trajet_id=eq.${trajetId}&voyageur_id=eq.${voyageurId}`
            );
            
            if (reservationsExistantes.length > 0) {
                return { success: false, message: 'Vous avez déjà réservé ce trajet.' };
            }

            // Créer la réservation
            const reservation = {
                trajet_id: trajetId,
                voyageur_id: voyageurId,
                nb_places: nbPlaces,
                statut: 'confirmee'
            };

            const result = await this.apiRequest('/reservations', 'POST', reservation);

            return { 
                success: true, 
                message: 'Réservation effectuée avec succès.',
                reservation: result[0]
            };
        } catch (error) {
            console.error('Erreur réservation:', error);
            return { success: false, message: 'Erreur lors de la réservation.' };
        }
    }

    // Obtenir les réservations d'un voyageur
    async getVoyageurReservations(voyageurId) {
        try {
            return await this.apiRequest(
                `/reservations?voyageur_id=eq.${voyageurId}&select=*,trajets(*,users!trajets_conducteur_id_fkey(nom,prenom,photo),vehicules(*))`
            );
        } catch (error) {
            console.error('Erreur réservations voyageur:', error);
            return [];
        }
    }

    // Obtenir les réservations pour les trajets d'un conducteur
    async getConducteurReservations(conducteurId) {
        try {
            return await this.apiRequest(
                `/reservations?select=*,trajets!inner(conducteur_id),users!reservations_voyageur_id_fkey(nom,prenom,photo)&trajets.conducteur_id=eq.${conducteurId}`
            );
        } catch (error) {
            console.error('Erreur réservations conducteur:', error);
            return [];
        }
    }

    // Mettre à jour le profil utilisateur
    async updateUserProfile(userId, profileData) {
        try {
            await this.apiRequest(`/users?id=eq.${userId}`, 'PATCH', profileData);
            return { success: true, message: 'Profil mis à jour avec succès.' };
        } catch (error) {
            console.error('Erreur mise à jour profil:', error);
            return { success: false, message: 'Erreur lors de la mise à jour.' };
        }
    }

    // Obtenir les avis d'un utilisateur
    async getUserAvis(userId, role) {
        try {
            const column = role === 'conducteur' ? 'evalue_id' : 'evaluateur_id';
            return await this.apiRequest(`/avis?${column}=eq.${userId}`);
        } catch (error) {
            console.error('Erreur avis utilisateur:', error);
            return [];
        }
    }

    // Calculer la note moyenne d'un utilisateur
    async getUserRating(userId, role) {
        try {
            const avis = await this.getUserAvis(userId, role);
            if (avis.length === 0) return { average: 0, count: 0 };
            
            const totalNote = avis.reduce((sum, avis) => sum + avis.note, 0);
            return {
                average: (totalNote / avis.length).toFixed(1),
                count: avis.length
            };
        } catch (error) {
            console.error('Erreur note utilisateur:', error);
            return { average: 0, count: 0 };
        }
    }

    // Utilitaires
    capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    // Hash simple du mot de passe (en production, utiliser bcrypt côté serveur)
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // Vérification simple du mot de passe
    async verifyPassword(password, hash) {
        const passwordHash = await this.hashPassword(password);
        return passwordHash === hash;
    }
}

// Instance globale du client Supabase
const database = new SupabaseClient();
