// Simulation de la base de données ecoride pour l'environnement statique
class DatabaseSimulator {
    constructor() {
        this.initDatabase();
    }

    // Initialise la base de données avec les vraies données du fichier SQL
    initDatabase() {
        // Table conducteurs (id, nom, prenom, email, password_hash, photo)
        this.conducteurs = [
            {
                id: 1,
                nom: 'dupont',
                prenom: 'paul', 
                email: 'pauldupont@hotmail.fr',
                password_hash: '$2y$10$IQj.lLrdV2H.Zd9Fp.6gg.6jxk8Tyh4B7nxBk8Az2YTvl6NBRFJVS',
                password_plain: 'Mavoiture6+', // Pour test en environnement statique
                photo: '../uploads/687ce8683a623_photo utilisateur.png'
            },
            {
                id: 2,
                nom: 'rive',
                prenom: 'jean',
                email: 'jeanrive@hotmail.fr', 
                password_hash: '$2y$10$2xzmsTkeoHM0ttHBuNy5TuG6qZPVqFh7WpQNyCfDkl1sT8AYpupy.',
                password_plain: 'password123', // Simulé
                photo: '../uploads/687cf2553ace9_photo utilisateur.png'
            },
            {
                id: 3,
                nom: 'moreau',
                prenom: 'claire',
                email: 'claire.moreau@outlook.com',
                password_hash: '$2y$10$example_hash_claire',
                password_plain: 'Claire789#',
                photo: '../uploads/687ce8567c0c4_photo utilisateur.png'
            },
            {
                id: 4,
                nom: 'laurent',
                prenom: 'thomas',
                email: 'thomas.laurent@free.fr',
                password_hash: '$2y$10$example_hash_thomas',
                password_plain: 'Thomas2024$',
                photo: '../uploads/687ce856c1f36_photo utilisateur.png'
            }
        ];

        // Table voyageurs (id, nom, prenom, email, password_hash, photo)
        this.voyageurs = [
            {
                id: 1,
                nom: 'pop',
                prenom: 'julie',
                email: 'juliepop@hotmail.fr',
                password_hash: '$2y$10$jhmaMRZfvj2kpJ5qRn0HeOrid8hrBVziDnIAWdYhlj5D0PFVHW1jS',
                password_plain: 'Monvoyage6+', // Pour test en environnement statique  
                photo: '../uploads/687ce8557f822_photo utilisateur.png'
            },
            {
                id: 2,
                nom: 'martin',
                prenom: 'sophie',
                email: 'sophie.martin@gmail.com',
                password_hash: '$2y$10$example_hash_sophie',
                password_plain: 'Sophie123!',
                photo: '../uploads/687ce855a9d4b_photo utilisateur.png'
            },
            {
                id: 3,
                nom: 'bernard',
                prenom: 'michel',
                email: 'michel.bernard@yahoo.fr',
                password_hash: '$2y$10$example_hash_michel',
                password_plain: 'Michel456@',
                photo: '../uploads/687ce85626731_photo utilisateur.png'
            }
        ];

        // Table trajets (données étendues)
        this.trajets = [
            {
                id: 1,
                conducteur_id: 1,
                depart: 'Paris',
                arrivee: 'Lyon',
                date_depart: '2025-07-25 08:00:00',
                date_arriver: '2025-07-25 12:00:00',
                prix: 45,
                places_disponibles: 3,
                places_totales: 4,
                vehicule_id: 1,
                statut: 'actif'
            },
            {
                id: 2,
                conducteur_id: 2,
                depart: 'Toulouse', 
                arrivee: 'Bordeaux',
                date_depart: '2025-07-26 09:30:00',
                date_arriver: '2025-07-26 12:30:00',
                prix: 35,
                places_disponibles: 2,
                places_totales: 3,
                vehicule_id: 2,
                statut: 'actif'
            },
            {
                id: 3,
                conducteur_id: 1,
                depart: 'Marseille',
                arrivee: 'Nice',
                date_depart: '2025-07-27 14:00:00',
                date_arriver: '2025-07-27 16:30:00', 
                prix: 25,
                places_disponibles: 2,
                places_totales: 4,
                vehicule_id: 1,
                statut: 'actif'
            },
            {
                id: 4,
                conducteur_id: 2,
                depart: 'Lille',
                arrivee: 'Paris',
                date_depart: '2025-07-28 07:00:00',
                date_arriver: '2025-07-28 10:00:00',
                prix: 30,
                places_disponibles: 1,
                places_totales: 3,
                vehicule_id: 2,
                statut: 'actif'
            },
            {
                id: 5,
                conducteur_id: 3,
                depart: 'Nantes',
                arrivee: 'Rennes',
                date_depart: '2025-07-29 15:00:00',
                date_arriver: '2025-07-29 17:00:00',
                prix: 20,
                places_disponibles: 3,
                places_totales: 4,
                vehicule_id: 3,
                statut: 'actif'
            },
            {
                id: 6,
                conducteur_id: 4,
                depart: 'Montpellier',
                arrivee: 'Barcelona',
                date_depart: '2025-07-30 06:00:00',
                date_arriver: '2025-07-30 10:00:00',
                prix: 60,
                places_disponibles: 2,
                places_totales: 3,
                vehicule_id: 4,
                statut: 'actif'
            }
        ];

        // Table vehicules (simulation)
        this.vehicules = [
            {
                id: 1,
                conducteur_id: 1,
                marque: 'Tesla',
                modele: 'Model 3',
                plaque: 'EL-123-AB',
                couleur: 'Blanc',
                annee: 2023,
                energie: 'electrique'
            },
            {
                id: 2, 
                conducteur_id: 2,
                marque: 'Peugeot',
                modele: '308',
                plaque: 'BC-456-CD', 
                couleur: 'Gris',
                annee: 2022,
                energie: 'essence'
            },
            {
                id: 3,
                conducteur_id: 3,
                marque: 'Renault',
                modele: 'Zoe',
                plaque: 'EV-789-EF',
                couleur: 'Bleu',
                annee: 2024,
                energie: 'electrique'
            },
            {
                id: 4,
                conducteur_id: 4,
                marque: 'Volkswagen',
                modele: 'Golf',
                plaque: 'VW-321-GH',
                couleur: 'Rouge',
                annee: 2023,
                energie: 'hybride'
            }
        ];

        // Table reservations (nouvelles données)
        this.reservations = [
            {
                id: 1,
                trajet_id: 1,
                voyageur_id: 1,
                nb_places: 1,
                statut: 'confirmee',
                date_reservation: '2025-07-20 10:30:00'
            },
            {
                id: 2,
                trajet_id: 2,
                voyageur_id: 2,
                nb_places: 1,
                statut: 'confirmee',
                date_reservation: '2025-07-19 14:15:00'
            },
            {
                id: 3,
                trajet_id: 4,
                voyageur_id: 3,
                nb_places: 2,
                statut: 'en_attente',
                date_reservation: '2025-07-21 09:00:00'
            }
        ];

        // Table avis/evaluations (nouvelles données)
        this.avis = [
            {
                id: 1,
                trajet_id: 1,
                evaluateur_id: 1,
                evaluateur_role: 'voyageur',
                evalue_id: 1,
                evalue_role: 'conducteur',
                note: 5,
                commentaire: 'Excellent conducteur, très ponctuel et véhicule propre!',
                date_avis: '2025-07-15 18:30:00'
            },
            {
                id: 2,
                trajet_id: 2,
                evaluateur_id: 2,
                evaluateur_role: 'conducteur',
                evalue_id: 2,
                evalue_role: 'voyageur',
                note: 4,
                commentaire: 'Voyageur sympathique et ponctuel.',
                date_avis: '2025-07-14 20:15:00'
            }
        ];

        console.log('Base de données simulée initialisée avec les vraies données');
    }

    // Authentification utilisateur
    authenticateUser(email, password) {
        // Chercher dans les conducteurs
        const conducteur = this.conducteurs.find(c => c.email === email);
        if (conducteur && conducteur.password_plain === password) {
            return {
                success: true,
                user: {
                    id: conducteur.id,
                    nom: this.capitalizeFirst(conducteur.nom),
                    prenom: this.capitalizeFirst(conducteur.prenom),
                    email: conducteur.email,
                    photo: conducteur.photo,
                    role: 'conducteur'
                }
            };
        }

        // Chercher dans les voyageurs
        const voyageur = this.voyageurs.find(v => v.email === email);
        if (voyageur && voyageur.password_plain === password) {
            return {
                success: true,
                user: {
                    id: voyageur.id,
                    nom: this.capitalizeFirst(voyageur.nom),
                    prenom: this.capitalizeFirst(voyageur.prenom),
                    email: voyageur.email,
                    photo: voyageur.photo,
                    role: 'voyageur'
                }
            };
        }

        return { success: false, message: 'Email ou mot de passe incorrect.' };
    }

    // Obtenir les trajets d'un conducteur
    getConducteurTrajets(conducteurId) {
        return this.trajets.filter(t => t.conducteur_id === conducteurId);
    }

    // Obtenir les véhicules d'un conducteur
    getConducteurVehicules(conducteurId) {
        return this.vehicules.filter(v => v.conducteur_id === conducteurId);
    }

    // Obtenir tous les trajets disponibles
    getTrajetsDisponibles() {
        return this.trajets.map(trajet => {
            const conducteur = this.conducteurs.find(c => c.id === trajet.conducteur_id);
            const vehicule = this.vehicules.find(v => v.id === trajet.vehicule_id);
            
            return {
                ...trajet,
                conducteur_nom: conducteur ? `${this.capitalizeFirst(conducteur.prenom)} ${this.capitalizeFirst(conducteur.nom)}` : 'Inconnu',
                vehicule: vehicule || null
            };
        });
    }

    // Mettre à jour le profil utilisateur
    updateUserProfile(userId, role, profileData) {
        const table = role === 'conducteur' ? this.conducteurs : this.voyageurs;
        const userIndex = table.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            table[userIndex] = { ...table[userIndex], ...profileData };
            return { success: true, message: 'Profil mis à jour avec succès.' };
        }
        
        return { success: false, message: 'Utilisateur non trouvé.' };
    }

    // Ajouter un nouveau trajet
    addTrajet(trajetData) {
        const newId = Math.max(...this.trajets.map(t => t.id)) + 1;
        const newTrajet = {
            id: newId,
            ...trajetData,
            statut: 'actif'
        };
        this.trajets.push(newTrajet);
        return { success: true, message: 'Trajet créé avec succès.', trajet: newTrajet };
    }

    // Ajouter un nouveau véhicule
    addVehicule(vehiculeData) {
        const newId = Math.max(...this.vehicules.map(v => v.id)) + 1;
        const newVehicule = {
            id: newId,
            ...vehiculeData
        };
        this.vehicules.push(newVehicule);
        return { success: true, message: 'Véhicule ajouté avec succès.', vehicule: newVehicule };
    }

    // Supprimer un trajet
    deleteTrajet(trajetId) {
        const index = this.trajets.findIndex(t => t.id === trajetId);
        if (index !== -1) {
            this.trajets.splice(index, 1);
            return { success: true, message: 'Trajet supprimé avec succès.' };
        }
        return { success: false, message: 'Trajet non trouvé.' };
    }

    // Supprimer un véhicule
    deleteVehicule(vehiculeId) {
        const index = this.vehicules.findIndex(v => v.id === vehiculeId);
        if (index !== -1) {
            this.vehicules.splice(index, 1);
            return { success: true, message: 'Véhicule supprimé avec succès.' };
        }
        return { success: false, message: 'Véhicule non trouvé.' };
    }

    // Filtrer les trajets
    searchTrajets(filters) {
        let results = this.getTrajetsDisponibles();
        
        if (filters.depart) {
            results = results.filter(t => 
                t.depart.toLowerCase().includes(filters.depart.toLowerCase())
            );
        }
        
        if (filters.arrivee) {
            results = results.filter(t => 
                t.arrivee.toLowerCase().includes(filters.arrivee.toLowerCase())
            );
        }
        
        if (filters.date) {
            const searchDate = new Date(filters.date);
            results = results.filter(t => {
                const trajetDate = new Date(t.date_depart);
                return trajetDate.toDateString() === searchDate.toDateString();
            });
        }
        
        if (filters.passagers) {
            const minPlaces = parseInt(filters.passagers);
            results = results.filter(t => t.places_disponibles >= minPlaces);
        }
        
        return results;
    }

    // Réserver une place dans un trajet
    reserverPlace(trajetId, voyageurId, nbPlaces) {
        const trajet = this.trajets.find(t => t.id === trajetId);
        if (!trajet) {
            return { success: false, message: 'Trajet non trouvé.' };
        }
        
        if (trajet.places_disponibles < nbPlaces) {
            return { success: false, message: 'Places insuffisantes disponibles.' };
        }

        // Vérifier si le voyageur a déjà réservé ce trajet
        const reservationExistante = this.reservations.find(r => 
            r.trajet_id === trajetId && r.voyageur_id === voyageurId
        );
        if (reservationExistante) {
            return { success: false, message: 'Vous avez déjà réservé ce trajet.' };
        }
        
        // Créer la réservation
        const newReservationId = Math.max(...this.reservations.map(r => r.id)) + 1;
        const reservation = {
            id: newReservationId,
            trajet_id: trajetId,
            voyageur_id: voyageurId,
            nb_places: nbPlaces,
            statut: 'confirmee',
            date_reservation: new Date().toISOString()
        };
        
        this.reservations.push(reservation);
        trajet.places_disponibles -= nbPlaces;
        
        return { 
            success: true, 
            message: 'Réservation effectuée avec succès.',
            reservation: reservation,
            trajet: trajet
        };
    }

    // Obtenir les réservations d'un voyageur
    getVoyageurReservations(voyageurId) {
        return this.reservations
            .filter(r => r.voyageur_id === voyageurId)
            .map(reservation => {
                const trajet = this.trajets.find(t => t.id === reservation.trajet_id);
                const conducteur = this.conducteurs.find(c => c.id === trajet?.conducteur_id);
                const vehicule = this.vehicules.find(v => v.id === trajet?.vehicule_id);
                
                return {
                    ...reservation,
                    trajet: trajet,
                    conducteur: conducteur ? {
                        nom: `${this.capitalizeFirst(conducteur.prenom)} ${this.capitalizeFirst(conducteur.nom)}`,
                        photo: conducteur.photo
                    } : null,
                    vehicule: vehicule
                };
            });
    }

    // Obtenir les réservations pour les trajets d'un conducteur
    getConducteurReservations(conducteurId) {
        const trajetsCondcuteur = this.trajets.filter(t => t.conducteur_id === conducteurId);
        const trajetIds = trajetsCondcuteur.map(t => t.id);
        
        return this.reservations
            .filter(r => trajetIds.includes(r.trajet_id))
            .map(reservation => {
                const trajet = this.trajets.find(t => t.id === reservation.trajet_id);
                const voyageur = this.voyageurs.find(v => v.id === reservation.voyageur_id);
                
                return {
                    ...reservation,
                    trajet: trajet,
                    voyageur: voyageur ? {
                        nom: `${this.capitalizeFirst(voyageur.prenom)} ${this.capitalizeFirst(voyageur.nom)}`,
                        photo: voyageur.photo
                    } : null
                };
            });
    }

    // Ajouter un avis
    ajouterAvis(trajetId, evaluateurId, evaluateurRole, evalueId, evalueRole, note, commentaire) {
        // Vérifier que la réservation existe et est terminée
        const reservation = this.reservations.find(r => 
            r.trajet_id === trajetId && 
            (r.voyageur_id === evaluateurId || this.trajets.find(t => t.id === trajetId)?.conducteur_id === evaluateurId)
        );
        
        if (!reservation) {
            return { success: false, message: 'Vous devez avoir participé à ce trajet pour laisser un avis.' };
        }

        const newAvisId = Math.max(...this.avis.map(a => a.id)) + 1;
        const nouvelAvis = {
            id: newAvisId,
            trajet_id: trajetId,
            evaluateur_id: evaluateurId,
            evaluateur_role: evaluateurRole,
            evalue_id: evalueId,
            evalue_role: evalueRole,
            note: note,
            commentaire: commentaire,
            date_avis: new Date().toISOString()
        };
        
        this.avis.push(nouvelAvis);
        
        return { 
            success: true, 
            message: 'Avis ajouté avec succès.',
            avis: nouvelAvis
        };
    }

    // Obtenir les avis d'un utilisateur
    getUserAvis(userId, role) {
        return this.avis.filter(a => a.evalue_id === userId && a.evalue_role === role);
    }

    // Calculer la note moyenne d'un utilisateur
    getUserRating(userId, role) {
        const userAvis = this.getUserAvis(userId, role);
        if (userAvis.length === 0) return { average: 0, count: 0 };
        
        const totalNote = userAvis.reduce((sum, avis) => sum + avis.note, 0);
        return {
            average: (totalNote / userAvis.length).toFixed(1),
            count: userAvis.length
        };
    }

    // Annuler une réservation
    annulerReservation(reservationId, userId) {
        const reservation = this.reservations.find(r => r.id === reservationId);
        if (!reservation) {
            return { success: false, message: 'Réservation non trouvée.' };
        }

        if (reservation.voyageur_id !== userId) {
            return { success: false, message: 'Vous ne pouvez pas annuler cette réservation.' };
        }

        // Remettre les places disponibles
        const trajet = this.trajets.find(t => t.id === reservation.trajet_id);
        if (trajet) {
            trajet.places_disponibles += reservation.nb_places;
        }

        // Supprimer la réservation
        const index = this.reservations.findIndex(r => r.id === reservationId);
        this.reservations.splice(index, 1);

        return { success: true, message: 'Réservation annulée avec succès.' };
    }

    // Obtenir l'historique complet d'un utilisateur
    getUserHistorique(userId, role) {
        if (role === 'voyageur') {
            return this.getVoyageurReservations(userId);
        } else {
            return this.getConducteurReservations(userId);
        }
    }

    // Inscription d'un nouvel utilisateur
    registerUser(userData) {
        try {
            const { nom, prenom, email, password, role, telephone } = userData;
            
            // Vérifier si l'email existe déjà
            const existingConducteur = this.conducteurs.find(c => c.email === email);
            const existingVoyageur = this.voyageurs.find(v => v.email === email);
            
            if (existingConducteur || existingVoyageur) {
                return {
                    success: false,
                    message: 'Cette adresse email est déjà utilisée.'
                };
            }
            
            // Créer le nouvel utilisateur
            const newUser = {
                id: Date.now(), // Simple ID basé sur timestamp
                nom: nom.toLowerCase(),
                prenom: prenom.toLowerCase(),
                email: email,
                password_hash: '$2y$10$simulated_hash_' + Date.now(),
                password_plain: password, // Pour la simulation
                photo: null,
                telephone: telephone || null
            };
            
            // Ajouter selon le rôle
            if (role === 'conducteur') {
                this.conducteurs.push(newUser);
            } else if (role === 'voyageur') {
                this.voyageurs.push(newUser);
            } else {
                return {
                    success: false,
                    message: 'Rôle utilisateur non valide.'
                };
            }
            
            console.log(`Nouvel utilisateur créé: ${prenom} ${nom} (${role})`);
            
            return {
                success: true,
                message: 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.',
                user: {
                    id: newUser.id,
                    nom: this.capitalizeFirst(newUser.nom),
                    prenom: this.capitalizeFirst(newUser.prenom),
                    email: newUser.email,
                    role: role
                }
            };
            
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            return {
                success: false,
                message: 'Erreur lors de la création du compte.'
            };
        }
    }

    // Utilitaire pour capitaliser la première lettre
    capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    // Debug - afficher toutes les données
    debugShowData() {
        console.log('=== BASE DE DONNÉES SIMULÉE ===');
        console.log('Conducteurs:', this.conducteurs);
        console.log('Voyageurs:', this.voyageurs); 
        console.log('Trajets:', this.trajets);
        console.log('Véhicules:', this.vehicules);
        console.log('Réservations:', this.reservations);
        console.log('Avis:', this.avis);
        console.log('==============================');
    }
}

// Instance globale de la base de données simulée
const database = new DatabaseSimulator();
