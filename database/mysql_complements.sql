-- Ajouts pour compléter la base MySQL EcoRide
-- À exécuter APRÈS l'import de ecoride_mysql.sql dans phpMyAdmin

-- Ajouter table admin (manquante)
CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager') DEFAULT 'admin',
    telephone VARCHAR(20),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('actif', 'inactif') DEFAULT 'actif'
);

-- Insérer les comptes admin manquants
INSERT INTO admins (nom, prenom, email, password_hash, role, telephone) VALUES
-- Admin principal avec hash de 'ecoride2025'
('EcoRide', 'Admin', 'admin@ecoride.fr', '$2b$10$fEo8wwcjneHpWsGK9xXX7ubLbcpbahR5BG9xjnrpcDklJCpVtK5qC', 'admin', '0123456789'),

-- Manager Robert avec hash de 'voiture'
('Manager', 'Robert', 'robert@ecoride.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'manager', '0123456788');

-- Ajouter quelques trajets plus récents (dates 2025)
INSERT INTO trajets (conducteur_id, vehicule_id, depart, arrivee, date_depart, date_arriver, prix, places_totales, places_disponibles) VALUES
(1, 1, 'Paris', 'Marseille', '2025-07-30 10:00:00', '2025-07-30 18:00:00', 75.00, 4, 2),
(2, 2, 'Lyon', 'Nice', '2025-07-31 14:00:00', '2025-07-31 20:00:00', 65.00, 3, 3),
(3, 3, 'Bordeaux', 'Toulouse', '2025-08-01 09:00:00', '2025-08-01 12:00:00', 40.00, 4, 1);

-- Ajouter des préférences aux conducteurs (simulation JSON en TEXT)
ALTER TABLE conducteurs ADD COLUMN preferences TEXT AFTER photo;
ALTER TABLE voyageurs ADD COLUMN preferences TEXT AFTER photo;

-- Mettre à jour les préférences
UPDATE conducteurs SET preferences = '{"music": true, "smoking": false, "pets": true, "talk": true}' WHERE id = 1; -- Paul
UPDATE conducteurs SET preferences = '{"music": false, "smoking": false, "pets": false, "talk": false}' WHERE id = 2; -- Jean
UPDATE voyageurs SET preferences = '{"music": true, "smoking": false, "pets": true, "talk": true}' WHERE id = 1; -- Julie

-- Ajouter colonne bio pour les descriptions
ALTER TABLE conducteurs ADD COLUMN bio TEXT AFTER telephone;
ALTER TABLE voyageurs ADD COLUMN bio TEXT AFTER telephone;

-- Mettre à jour les bios
UPDATE conducteurs SET bio = 'Conducteur expérimenté, conduite écologique et sécurisée' WHERE email = 'pauldupont@hotmail.fr';
UPDATE conducteurs SET bio = 'Conduite calme et respectueuse, véhicule toujours propre' WHERE email = 'jeanrive@hotmail.fr';
UPDATE voyageurs SET bio = 'Voyageuse régulière, respectueuse de l\'environnement' WHERE email = 'juliepop@hotmail.fr';

-- Afficher un résumé des données
SELECT 'RÉSUMÉ DE LA BASE ECORIDE' as info;
SELECT COUNT(*) as nb_conducteurs, 'conducteurs' as table_name FROM conducteurs
UNION ALL
SELECT COUNT(*) as nb_voyageurs, 'voyageurs' FROM voyageurs  
UNION ALL
SELECT COUNT(*) as nb_admins, 'admins' FROM admins
UNION ALL
SELECT COUNT(*) as nb_vehicules, 'vehicules' FROM vehicules
UNION ALL
SELECT COUNT(*) as nb_trajets, 'trajets' FROM trajets
UNION ALL
SELECT COUNT(*) as nb_reservations, 'reservations' FROM reservations;
