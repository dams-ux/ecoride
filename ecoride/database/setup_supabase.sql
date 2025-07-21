-- Script de création de la base de données EcoRide pour Supabase
-- À exécuter dans l'interface Supabase SQL Editor

-- Table des utilisateurs (combiné conducteurs + voyageurs)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('conducteur', 'voyageur', 'admin')),
    photo TEXT,
    telephone VARCHAR(20),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actif BOOLEAN DEFAULT TRUE
);

-- Table des véhicules
CREATE TABLE vehicules (
    id SERIAL PRIMARY KEY,
    conducteur_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    marque VARCHAR(50) NOT NULL,
    modele VARCHAR(50) NOT NULL,
    plaque VARCHAR(20) UNIQUE NOT NULL,
    couleur VARCHAR(30),
    annee INTEGER CHECK (annee >= 1990 AND annee <= 2030),
    energie VARCHAR(20) CHECK (energie IN ('essence', 'diesel', 'electrique', 'hybride')),
    nb_places INTEGER DEFAULT 4 CHECK (nb_places >= 1 AND nb_places <= 8),
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des trajets
CREATE TABLE trajets (
    id SERIAL PRIMARY KEY,
    conducteur_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    vehicule_id INTEGER REFERENCES vehicules(id) ON DELETE SET NULL,
    depart VARCHAR(255) NOT NULL,
    arrivee VARCHAR(255) NOT NULL,
    date_depart TIMESTAMP NOT NULL,
    date_arrivee TIMESTAMP,
    prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
    places_totales INTEGER NOT NULL CHECK (places_totales >= 1),
    places_disponibles INTEGER NOT NULL CHECK (places_disponibles >= 0),
    statut VARCHAR(20) DEFAULT 'actif' CHECK (statut IN ('actif', 'complet', 'annule', 'termine')),
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des réservations
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    trajet_id INTEGER REFERENCES trajets(id) ON DELETE CASCADE,
    voyageur_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    nb_places INTEGER NOT NULL CHECK (nb_places >= 1),
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'refusee', 'annulee')),
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message_voyageur TEXT,
    UNIQUE(trajet_id, voyageur_id)
);

-- Table des avis/évaluations
CREATE TABLE avis (
    id SERIAL PRIMARY KEY,
    trajet_id INTEGER REFERENCES trajets(id) ON DELETE CASCADE,
    evaluateur_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    evalue_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    note INTEGER NOT NULL CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    date_avis TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(trajet_id, evaluateur_id, evalue_id)
);

-- Table des messages (pour la communication)
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    trajet_id INTEGER REFERENCES trajets(id) ON DELETE CASCADE,
    expediteur_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    destinataire_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des données de test avec vos utilisateurs existants
INSERT INTO users (nom, prenom, email, password_hash, role, photo, telephone, bio) VALUES 
-- Admin avec le hash de 'ecoride2025'
('Admin', 'EcoRide', 'admin@ecoride.fr', '$2b$10$fEo8wwcjneHpWsGK9xXX7ubLbcpbahR5BG9xjnrpcDklJCpVtK5qC', 'admin', '../assets/admin-avatar.png', '0123456789', 'Administrateur du système EcoRide'),

-- Employé Robert avec hash de 'voiture'  
('Robert', 'Manager', 'robert@ecoride.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '../assets/manager-avatar.png', '0123456788', 'Manager EcoRide'),

-- Conducteur existant - Paul Dupont avec hash de 'Mavoiture6+'
('Dupont', 'Paul', 'pauldupont@hotmail.fr', '$2y$10$IQj.lLrdV2H.Zd9Fp.6gg.6jxk8Tyh4B7nxBk8Az2YTvl6NBRFJVS', 'conducteur', '../uploads/687ce8683a623_photo utilisateur.png', '0647852963', 'Conducteur expérimenté, conduite écologique'),

-- Voyageur existant - Julie Pop avec hash de 'Monvoyage6+'
('Pop', 'Julie', 'juliepop@hotmail.fr', '$2y$10$jhmaMRZfvj2kpJ5qRn0HeOrid8hrBVziDnIAWdYhlj5D0PFVHW1jS', 'voyageur', '../uploads/687ce8557f822_photo utilisateur.png', '0685741236', 'Voyageuse régulière, respectueuse de l\'environnement'),

-- Autres utilisateurs de test
('Rive', 'Jean', 'jeanrive@hotmail.fr', '$2y$10$2xzmsTkeoHM0ttHBuNy5TuG6qZPVqFh7WpQNyCfDkl1sT8AYpupy.', 'conducteur', '../uploads/687cf2553ace9_photo utilisateur.png', '0654789123', 'Conducteur régulier'),
('Moreau', 'Claire', 'claire.moreau@outlook.com', '$2y$10$example_hash_claire', 'conducteur', '../uploads/687ce8567c0c4_photo utilisateur.png', '0612345678', 'Conduite éco-responsable'),
('Martin', 'Sophie', 'sophie.martin@gmail.com', '$2y$10$example_hash_sophie', 'voyageur', '../uploads/687ce855a9d4b_photo utilisateur.png', '0687654321', 'Voyageuse occasionnelle');

-- Insertion des véhicules de test
INSERT INTO vehicules (conducteur_id, marque, modele, plaque, couleur, annee, energie, nb_places) VALUES
(1, 'Tesla', 'Model 3', 'EL-123-AB', 'Blanc', 2023, 'electrique', 4),
(2, 'Peugeot', '308', 'BC-456-CD', 'Gris', 2022, 'essence', 4),
(4, 'Renault', 'Zoe', 'EV-789-EF', 'Bleu', 2024, 'electrique', 4);

-- Insertion des trajets de test
INSERT INTO trajets (conducteur_id, vehicule_id, depart, arrivee, date_depart, date_arrivee, prix, places_totales, places_disponibles) VALUES
(1, 1, 'Paris', 'Lyon', '2025-07-25 08:00:00', '2025-07-25 12:00:00', 45.00, 4, 3),
(2, 2, 'Toulouse', 'Bordeaux', '2025-07-26 09:30:00', '2025-07-26 12:30:00', 35.00, 3, 2),
(1, 1, 'Marseille', 'Nice', '2025-07-27 14:00:00', '2025-07-27 16:30:00', 25.00, 4, 2),
(4, 3, 'Nantes', 'Rennes', '2025-07-29 15:00:00', '2025-07-29 17:00:00', 20.00, 4, 3);

-- Insertion des réservations de test
INSERT INTO reservations (trajet_id, voyageur_id, nb_places, statut) VALUES
(1, 3, 1, 'confirmee'),
(2, 5, 1, 'confirmee'),
(1, 5, 1, 'en_attente');

-- Insertion des avis de test
INSERT INTO avis (trajet_id, evaluateur_id, evalue_id, note, commentaire) VALUES
(1, 3, 1, 5, 'Excellent conducteur, très ponctuel et véhicule propre!'),
(2, 2, 5, 4, 'Voyageur sympathique et ponctuel.');

-- Fonctions et triggers pour maintenir la cohérence
CREATE OR REPLACE FUNCTION update_places_disponibles()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.statut = 'confirmee' THEN
        UPDATE trajets 
        SET places_disponibles = places_disponibles - NEW.nb_places
        WHERE id = NEW.trajet_id;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.statut != 'confirmee' AND NEW.statut = 'confirmee' THEN
            UPDATE trajets 
            SET places_disponibles = places_disponibles - NEW.nb_places
            WHERE id = NEW.trajet_id;
        ELSIF OLD.statut = 'confirmee' AND NEW.statut != 'confirmee' THEN
            UPDATE trajets 
            SET places_disponibles = places_disponibles + NEW.nb_places
            WHERE id = NEW.trajet_id;
        END IF;
    ELSIF TG_OP = 'DELETE' AND OLD.statut = 'confirmee' THEN
        UPDATE trajets 
        SET places_disponibles = places_disponibles + OLD.nb_places
        WHERE id = OLD.trajet_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement les places disponibles
CREATE TRIGGER trigger_update_places_disponibles
    AFTER INSERT OR UPDATE OR DELETE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_places_disponibles();

-- Index pour les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trajets_depart_arrivee ON trajets(depart, arrivee);
CREATE INDEX idx_trajets_date_depart ON trajets(date_depart);
CREATE INDEX idx_reservations_trajet_id ON reservations(trajet_id);
CREATE INDEX idx_reservations_voyageur_id ON reservations(voyageur_id);

-- Politique de sécurité Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicules ENABLE ROW LEVEL SECURITY;
ALTER TABLE trajets ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE avis ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres données
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Les conducteurs peuvent gérer leurs véhicules
CREATE POLICY "Conducteurs can manage own vehicles" ON vehicules FOR ALL USING (auth.uid()::text = conducteur_id::text);

-- Tous peuvent voir les trajets, seuls les conducteurs peuvent gérer les leurs
CREATE POLICY "Everyone can view trajets" ON trajets FOR SELECT USING (true);
CREATE POLICY "Conducteurs can manage own trajets" ON trajets FOR ALL USING (auth.uid()::text = conducteur_id::text);

-- Les utilisateurs peuvent voir leurs réservations
CREATE POLICY "Users can view own reservations" ON reservations FOR SELECT USING (
    auth.uid()::text = voyageur_id::text OR 
    auth.uid()::text IN (SELECT conducteur_id::text FROM trajets WHERE id = trajet_id)
);

-- Les avis sont visibles par tous
CREATE POLICY "Everyone can view avis" ON avis FOR SELECT USING (true);
CREATE POLICY "Users can add avis" ON avis FOR INSERT WITH CHECK (auth.uid()::text = evaluateur_id::text);
