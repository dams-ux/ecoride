
// Système de base de données simulée pour les trajets
const database = {
    trajets: [
        {
            id: 1,
            depart: "Paris",
            arrivee: "Lyon",
            date_depart: "2025-07-22T08:00:00",
            date_arriver: "2025-07-22T12:30:00",
            prix: 35,
            places_disponibles: 3,
            conducteur_nom: "Marie Dupont",
            conducteur_photo: "assets/default-avatar.png",
            note_moyenne: 4.8,
            vehicule: {
                marque: "Tesla",
                modele: "Model 3",
                energie: "electrique"
            }
        },
        {
            id: 2,
            depart: "Paris",
            arrivee: "Marseille",
            date_depart: "2025-07-22T14:00:00",
            date_arriver: "2025-07-22T21:00:00",
            prix: 55,
            places_disponibles: 2,
            conducteur_nom: "Pierre Martin",
            conducteur_photo: "assets/default-avatar.png",
            note_moyenne: 4.5,
            vehicule: {
                marque: "Peugeot",
                modele: "3008",
                energie: "hybride"
            }
        },
        {
            id: 3,
            depart: "Lyon",
            arrivee: "Paris",
            date_depart: "2025-07-23T09:00:00",
            date_arriver: "2025-07-23T13:30:00",
            prix: 38,
            places_disponibles: 1,
            conducteur_nom: "Sophie Laurent",
            conducteur_photo: "assets/default-avatar.png",
            note_moyenne: 4.9,
            vehicule: {
                marque: "Renault",
                modele: "Zoe",
                energie: "electrique"
            }
        },
        {
            id: 4,
            depart: "Toulouse",
            arrivee: "Bordeaux",
            date_depart: "2025-07-22T16:00:00",
            date_arriver: "2025-07-22T18:30:00",
            prix: 25,
            places_disponibles: 2,
            conducteur_nom: "Jean Moreau",
            conducteur_photo: "assets/default-avatar.png",
            note_moyenne: 4.3,
            vehicule: {
                marque: "Citroën",
                modele: "C4",
                energie: "essence"
            }
        },
        {
            id: 5,
            depart: "Nice",
            arrivee: "Monaco",
            date_depart: "2025-07-22T10:00:00",
            date_arriver: "2025-07-22T10:45:00",
            prix: 15,
            places_disponibles: 3,
            conducteur_nom: "Anna Rossi",
            conducteur_photo: "assets/default-avatar.png",
            note_moyenne: 4.7,
            vehicule: {
                marque: "BMW",
                modele: "i3",
                energie: "electrique"
            }
        }
    ],

    // Récupérer tous les trajets disponibles
    getTrajetsDisponibles: function() {
        return this.trajets.filter(t => t.places_disponibles > 0);
    },

    // Rechercher des trajets avec filtres
    searchTrajets: function(filters) {
        let resultats = this.trajets.filter(t => t.places_disponibles > 0);

        if (filters.depart) {
            const departLower = filters.depart.toLowerCase();
            resultats = resultats.filter(t => 
                t.depart.toLowerCase().includes(departLower)
            );
        }

        if (filters.arrivee) {
            const arriveeLower = filters.arrivee.toLowerCase();
            resultats = resultats.filter(t => 
                t.arrivee.toLowerCase().includes(arriveeLower)
            );
        }

        if (filters.date) {
            const searchDate = new Date(filters.date).toDateString();
            resultats = resultats.filter(t => 
                new Date(t.date_depart).toDateString() === searchDate
            );
        }

        if (filters.passagers) {
            const passengerCount = parseInt(filters.passagers);
            resultats = resultats.filter(t => t.places_disponibles >= passengerCount);
        }

        return resultats;
    },

    // Récupérer un trajet par ID
    getTrajetById: function(id) {
        return this.trajets.find(t => t.id === id);
    }
};

// Fonctions pour les interactions avec les trajets
function reserverTrajet(trajetId) {
    const trajet = database.getTrajetById(trajetId);
    if (!trajet) {
        alert('Trajet non trouvé.');
        return;
    }

    if (trajet.places_disponibles <= 0) {
        alert('Plus de places disponibles pour ce trajet.');
        return;
    }

    // Vérifier si l'utilisateur est connecté
    if (typeof auth !== 'undefined' && !auth.isLoggedIn()) {
        alert('Vous devez être connecté pour réserver un trajet.');
        window.location.href = 'login.html';
        return;
    }

    const confirmation = confirm(
        `Confirmer la réservation ?\n\n` +
        `Trajet: ${trajet.depart} → ${trajet.arrivee}\n` +
        `Date: ${new Date(trajet.date_depart).toLocaleDateString('fr-FR')}\n` +
        `Prix: ${trajet.prix}€\n` +
        `Conducteur: ${trajet.conducteur_nom}`
    );

    if (confirmation) {
        // Simulation de la réservation
        trajet.places_disponibles--;
        alert(`Réservation confirmée ! \nVous recevrez un email de confirmation.`);
        
        // Recharger l'affichage
        if (typeof searchRides === 'function') {
            searchRides();
        }
    }
}

function contactConducteur(nomConducteur) {
    // Vérifier si l'utilisateur est connecté
    if (typeof auth !== 'undefined' && !auth.isLoggedIn()) {
        alert('Vous devez être connecté pour contacter un conducteur.');
        window.location.href = 'login.html';
        return;
    }

    alert(`Fonctionnalité de contact avec ${nomConducteur} à venir.\nVous pourrez bientôt envoyer un message direct.`);
}

function showRideDetails(trajetId) {
    const trajet = database.getTrajetById(trajetId);
    if (!trajet) {
        alert('Détails du trajet non disponibles.');
        return;
    }

    const vehiculeInfo = trajet.vehicule ? 
        `${trajet.vehicule.marque} ${trajet.vehicule.modele} (${trajet.vehicule.energie})` : 
        'Non spécifié';

    alert(
        `Détails du trajet:\n\n` +
        `🚗 ${trajet.depart} → ${trajet.arrivee}\n` +
        `📅 Départ: ${new Date(trajet.date_depart).toLocaleString('fr-FR')}\n` +
        `📅 Arrivée: ${new Date(trajet.date_arriver).toLocaleString('fr-FR')}\n` +
        `💰 Prix: ${trajet.prix}€\n` +
        `👥 Places disponibles: ${trajet.places_disponibles}\n` +
        `👤 Conducteur: ${trajet.conducteur_nom}\n` +
        `⭐ Note: ${trajet.note_moyenne}/5\n` +
        `🚙 Véhicule: ${vehiculeInfo}`
    );
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-user').forEach(function(drop){
        drop.querySelector('.navbar-icon-user').addEventListener('click', function(e){
            e.stopPropagation();
            drop.classList.toggle('open');
        });
    });
    document.addEventListener('click', function(){
        document.querySelectorAll('.dropdown-user.open').forEach(function(drop){
            drop.classList.remove('open');
        });
    });
});





function checkPasswordStrength() {
    const pwd = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;
    const errorDiv = document.getElementById('password-error');
    // Regex : au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 symbole, 8 caractères mini
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongRegex.test(pwd)) {
        errorDiv.textContent = "Le mot de passe n'est pas assez fort.";
        return false;
    }
    if (pwd !== confirm) {
        errorDiv.textContent = "Les mots de passe ne correspondent pas.";
        return false;
    }
    errorDiv.textContent = "";
    return true;
}

// function generatePassword(length = 12) {
//     const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
//     let password = "";
//     while (true) {
//         password = "";
//         for (let i = 0; i < length; i++) {
//             password += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
//         // Vérifie la force du mot de passe généré
//         const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//         if (strongRegex.test(password)) break;
//     }
//     document.getElementById('generated-password').value = password;
//     document.getElementById('password').value = password;
//     document.getElementById('confirm_password').value = password;
//     document.getElementById('password-error').textContent = "";
// }

// function copyPassword() {
//     const input = document.getElementById('generated-password');
//     input.select();
//     document.execCommand('copy');
// }




function generatePassword(length = 12) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*";
    let all = lower + upper + numbers + symbols;

    let password = "";
    // Garantir au moins un de chaque
    password += lower[Math.floor(Math.random() * lower.length)];
    password += upper[Math.floor(Math.random() * upper.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = 4; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }
    // Mélange le mot de passe
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    document.getElementById('password').value = password;
    document.getElementById('confirm_password').value = password;
    document.getElementById('generated-password').value = password;
    document.getElementById('password-error').textContent = "";
}
function copyPassword() {
    const input = document.getElementById('generated-password');
    input.select();
    document.execCommand('copy');
}

function previewPhoto(event) {
    const input = event.target;
    const preview = document.getElementById('photo-preview');
    if (input?.files?.[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
document.getElementById('form-recherche-covoiturage').onsubmit = async function(e) {
    e.preventDefault();
    const depart = document.getElementById('depart').value;
    const arrivee = document.getElementById('arrivee').value;
    const date = document.getElementById('date').value;
    const tarif = document.getElementById('tarif').value;
    const vehicule = document.getElementById('vehicule').options[document.getElementById('vehicule').selectedIndex].text;

    // Exemple d'appel API (remplace par ton vrai endpoint si besoin)
    // const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${depart}`);
    // const data = await response.json();
    // Ici tu peux faire un calcul de distance, durée, etc.

    // Affiche la proposition
    document.getElementById('trajet-info').textContent =
        `${depart} → ${arrivee} le ${date} | Tarif : ${tarif} € | Véhicule : ${vehicule}`;
    document.getElementById('proposition-trajet').style.display = 'block';
};

function confirmerTrajet() {
    alert("Trajet accepté et ajouté dans la liste de covoiturage !");
    document.getElementById('proposition-trajet').style.display = 'none';
}