-- Base de données EcoRide - Structure MySQL complète
CREATE DATABASE IF NOT EXISTS ecoride CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecoride;

-- Table des conducteurs
CREATE TABLE conducteurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    photo VARCHAR(255) DEFAULT 'assets/default-avatar.svg',
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('actif', 'suspendu', 'inactif') DEFAULT 'actif',
    note_moyenne DECIMAL(2,1) DEFAULT 0.0,
    nb_avis INT DEFAULT 0
);

-- Table des voyageurs
CREATE TABLE voyageurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    photo VARCHAR(255) DEFAULT 'assets/default-avatar.svg',
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('actif', 'suspendu', 'inactif') DEFAULT 'actif',
    note_moyenne DECIMAL(2,1) DEFAULT 0.0,
    nb_avis INT DEFAULT 0
);

-- Table des véhicules
CREATE TABLE vehicules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conducteur_id INT NOT NULL,
    marque VARCHAR(100) NOT NULL,
    modele VARCHAR(100) NOT NULL,
    plaque VARCHAR(20) UNIQUE NOT NULL,
    couleur VARCHAR(50),
    annee YEAR,
    energie ENUM('electrique', 'hybride', 'essence', 'diesel') NOT NULL,
    nb_places INT DEFAULT 4,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conducteur_id) REFERENCES conducteurs(id) ON DELETE CASCADE
);

-- Table des trajets
CREATE TABLE trajets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conducteur_id INT NOT NULL,
    vehicule_id INT NOT NULL,
    depart VARCHAR(255) NOT NULL,
    arrivee VARCHAR(255) NOT NULL,
    date_depart DATETIME NOT NULL,
    date_arriver DATETIME NOT NULL,
    prix DECIMAL(8,2) NOT NULL,
    places_totales INT NOT NULL,
    places_disponibles INT NOT NULL,
    description TEXT,
    statut ENUM('actif', 'complet', 'annule', 'termine') DEFAULT 'actif',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conducteur_id) REFERENCES conducteurs(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicule_id) REFERENCES vehicules(id) ON DELETE CASCADE
);

-- Table des réservations
CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trajet_id INT NOT NULL,
    voyageur_id INT NOT NULL,
    nb_places INT NOT NULL,
    prix_total DECIMAL(8,2) NOT NULL,
    statut ENUM('en_attente', 'confirmee', 'refusee', 'annulee') DEFAULT 'en_attente',
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message_voyageur TEXT,
    message_conducteur TEXT,
    FOREIGN KEY (trajet_id) REFERENCES trajets(id) ON DELETE CASCADE,
    FOREIGN KEY (voyageur_id) REFERENCES voyageurs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_reservation (trajet_id, voyageur_id)
);

-- Table des avis/évaluations
CREATE TABLE avis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trajet_id INT NOT NULL,
    evaluateur_id INT NOT NULL,
    evaluateur_type ENUM('conducteur', 'voyageur') NOT NULL,
    evalue_id INT NOT NULL,
    evalue_type ENUM('conducteur', 'voyageur') NOT NULL,
    note INT CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    date_avis TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trajet_id) REFERENCES trajets(id) ON DELETE CASCADE
);

-- Table pour les messages entre utilisateurs
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    expediteur_id INT NOT NULL,
    expediteur_type ENUM('conducteur', 'voyageur') NOT NULL,
    destinataire_id INT NOT NULL,
    destinataire_type ENUM('conducteur', 'voyageur') NOT NULL,
    trajet_id INT,
    sujet VARCHAR(255),
    message TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trajet_id) REFERENCES trajets(id) ON DELETE SET NULL
);

-- Insertion des données d'exemple
INSERT INTO conducteurs (nom, prenom, email, password_hash, photo) VALUES
('Dupont', 'Paul', 'pauldupont@hotmail.fr', '$2y$10$IQj.lLrdV2H.Zd9Fp.6gg.6jxk8Tyh4B7nxBk8Az2YTvl6NBRFJVS', '../uploads/687ce8683a623_photo utilisateur.png'),
('Rive', 'Jean', 'jeanrive@hotmail.fr', '$2y$10$2xzmsTkeoHM0ttHBuNy5TuG6qZPVqFh7WpQNyCfDkl1sT8AYpupy.', '../uploads/687cf2553ace9_photo utilisateur.png'),
('Moreau', 'Claire', 'claire.moreau@outlook.com', '$2y$10$example_hash_claire', '../uploads/687ce8567c0c4_photo utilisateur.png'),
('Laurent', 'Thomas', 'thomas.laurent@free.fr', '$2y$10$example_hash_thomas', '../uploads/687ce856c1f36_photo utilisateur.png');

INSERT INTO voyageurs (nom, prenom, email, password_hash, photo) VALUES
('Pop', 'Julie', 'juliepop@hotmail.fr', '$2y$10$jhmaMRZfvj2kpJ5qRn0HeOrid8hrBVziDnIAWdYhlj5D0PFVHW1jS', '../uploads/687ce8557f822_photo utilisateur.png'),
('Martin', 'Sophie', 'sophie.martin@gmail.com', '$2y$10$example_hash_sophie', '../uploads/687ce855a9d4b_photo utilisateur.png'),
('Bernard', 'Michel', 'michel.bernard@yahoo.fr', '$2y$10$example_hash_michel', '../uploads/687ce85626731_photo utilisateur.png');

INSERT INTO vehicules (conducteur_id, marque, modele, plaque, couleur, annee, energie) VALUES
(1, 'Tesla', 'Model 3', 'EL-123-AB', 'Blanc', 2023, 'electrique'),
(2, 'Peugeot', '308', 'BC-456-CD', 'Gris', 2022, 'essence'),
(3, 'Renault', 'Zoe', 'EV-789-EF', 'Bleu', 2024, 'electrique'),
(4, 'Volkswagen', 'Golf', 'VW-321-GH', 'Rouge', 2023, 'hybride');

INSERT INTO trajets (conducteur_id, vehicule_id, depart, arrivee, date_depart, date_arriver, prix, places_totales, places_disponibles) VALUES
(1, 1, 'Paris', 'Lyon', '2025-07-25 08:00:00', '2025-07-25 12:00:00', 45.00, 4, 3),
(2, 2, 'Toulouse', 'Bordeaux', '2025-07-26 09:30:00', '2025-07-26 12:30:00', 35.00, 3, 2),
(1, 1, 'Marseille', 'Nice', '2025-07-27 14:00:00', '2025-07-27 16:30:00', 25.00, 4, 2),
(2, 2, 'Lille', 'Paris', '2025-07-28 07:00:00', '2025-07-28 10:00:00', 30.00, 3, 1),
(3, 3, 'Nantes', 'Rennes', '2025-07-29 15:00:00', '2025-07-29 17:00:00', 20.00, 4, 3),
(4, 4, 'Montpellier', 'Barcelona', '2025-07-30 06:00:00', '2025-07-30 10:00:00', 60.00, 3, 2);

INSERT INTO reservations (trajet_id, voyageur_id, nb_places, prix_total, statut) VALUES
(1, 1, 1, 45.00, 'confirmee'),
(2, 2, 1, 35.00, 'confirmee'),
(4, 3, 2, 60.00, 'en_attente');

INSERT INTO avis (trajet_id, evaluateur_id, evaluateur_type, evalue_id, evalue_type, note, commentaire) VALUES
(1, 1, 'voyageur', 1, 'conducteur', 5, 'Excellent conducteur, très ponctuel et véhicule propre!'),
(2, 2, 'conducteur', 2, 'voyageur', 4, 'Voyageur sympathique et ponctuel.');
