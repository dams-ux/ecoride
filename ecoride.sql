-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 21 juil. 2025 à 11:20
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecoride`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `nom`, `prenom`, `email`, `password`) VALUES
(1, 'Admin', 'Principal', 'admin@ecoride.fr', '$2b$10$fEo8wwcjneHpWsGK9xXX7ubLbcpbahR5BG9xjnrpcDklJCpVtK5qC');

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `id` int(11) NOT NULL,
  `conducteur_id` int(11) DEFAULT NULL,
  `utilisateur_id` int(11) DEFAULT NULL,
  `note` int(11) DEFAULT NULL,
  `commentaire` text DEFAULT NULL,
  `date_avis` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `conducteurs`
--

CREATE TABLE `conducteurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT 'assets/default-avatar.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `conducteurs`
--

INSERT INTO `conducteurs` (`id`, `nom`, `prenom`, `email`, `password`, `photo`) VALUES
(1, 'dupont', 'paul', 'pauldupont@hotmail.fr', '$2y$10$IQj.lLrdV2H.Zd9Fp.6gg.6jxk8Tyh4B7nxBk8Az2YTvl6NBRFJVS', '../uploads/687ce8683a623_photo utilisateur.png'),
(2, 'rive', 'jean', 'jeanrive@hotmail.fr', '$2y$10$2xzmsTkeoHM0ttHBuNy5TuG6qZPVqFh7WpQNyCfDkl1sT8AYpupy.', '../uploads/687cf2553ace9_photo utilisateur.png');

-- --------------------------------------------------------

--
-- Structure de la table `employes`
--

CREATE TABLE `employes` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `employes`
--

INSERT INTO `employes` (`id`, `nom`, `prenom`, `email`, `password`) VALUES
(1, 'robert', NULL, 'robert@ecoride.fr', '$2y$10$/4wmG4Jpjfpc4Jnuz4cn8uQLwKdYJDuRkF8fHbbxDy0kI09uHm5rS');

-- --------------------------------------------------------

--
-- Structure de la table `employe_spaces`
--

CREATE TABLE `employe_spaces` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `employe_space_users`
--

CREATE TABLE `employe_space_users` (
  `id` int(11) NOT NULL,
  `employe_id` int(11) DEFAULT NULL,
  `space_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `trajet_id` int(11) DEFAULT NULL,
  `voyageur_id` int(11) DEFAULT NULL,
  `date_reservation` datetime DEFAULT current_timestamp(),
  `statut` enum('en_attente','acceptee','refusee','annulee') DEFAULT 'en_attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `trajets`
--

CREATE TABLE `trajets` (
  `id` int(11) NOT NULL,
  `conducteur_id` int(11) DEFAULT NULL,
  `depart` varchar(255) NOT NULL,
  `arrivee` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `date_depart` datetime NOT NULL,
  `date_arriver` date DEFAULT NULL,
  `tarif` decimal(6,2) NOT NULL DEFAULT 0.00,
  `nb_places` int(11) NOT NULL,
  `prix` decimal(6,2) NOT NULL,
  `vehicule_ecologique` tinyint(1) DEFAULT 0,
  `description` text DEFAULT NULL,
  `vehicule_id` int(11) DEFAULT NULL,
  `statut` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `trajets`
--

INSERT INTO `trajets` (`id`, `conducteur_id`, `depart`, `arrivee`, `destination`, `date_depart`, `date_arriver`, `tarif`, `nb_places`, `prix`, `vehicule_ecologique`, `description`, `vehicule_id`, `statut`) VALUES
(18, 2, 'narbonne', 'perpignan', '', '2025-08-02 00:00:00', '2025-08-03', 12.00, 0, 0.00, 0, NULL, 17, NULL),
(21, 1, 'narbonne', 'perpignan', '', '2025-07-26 00:00:00', '2025-07-30', 9.00, 3, 0.00, 0, NULL, 18, NULL),
(22, 1, 'paris', 'perpignan', '', '2025-07-20 00:00:00', '2025-07-21', 50.00, 2, 0.00, 0, NULL, 19, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `role` enum('admin','employe','voyageur','conducteur') NOT NULL DEFAULT 'voyageur',
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vehicules`
--

CREATE TABLE `vehicules` (
  `id` int(11) NOT NULL,
  `conducteur_id` int(11) NOT NULL,
  `marque` varchar(50) DEFAULT NULL,
  `modele` varchar(50) DEFAULT NULL,
  `plaque` varchar(20) DEFAULT NULL,
  `couleur` varchar(30) DEFAULT NULL,
  `annee` int(11) DEFAULT NULL,
  `energie` varchar(32) NOT NULL DEFAULT 'thermique'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `vehicules`
--

INSERT INTO `vehicules` (`id`, `conducteur_id`, `marque`, `modele`, `plaque`, `couleur`, `annee`, `energie`) VALUES
(12, 2, 'peugeot', '3008', 'bd-726-lo', 'blanche', 2025, 'thermique'),
(17, 2, 'tesla', '1', 'fv-786-pq', 'Bleu', 2024, 'electrique'),
(18, 1, 'peugeot', '3008', 'bd-726-lo', 'blanche', 2025, 'electrique'),
(19, 1, 'renault', 'megane', 'mv-568-er', 'rouge', 1999, 'thermique');

-- --------------------------------------------------------

--
-- Structure de la table `voyageurs`
--

CREATE TABLE `voyageurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `voyageurs`
--

INSERT INTO `voyageurs` (`id`, `nom`, `prenom`, `email`, `password`, `photo`) VALUES
(1, 'pop', 'julie', 'juliepop@hotmail.fr', '$2y$10$jhmaMRZfvj2kpJ5qRn0HeOrid8hrBVziDnIAWdYhlj5D0PFVHW1jS', 'assets/voyageur_1.png');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `conducteurs`
--
ALTER TABLE `conducteurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `employes`
--
ALTER TABLE `employes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `employe_spaces`
--
ALTER TABLE `employe_spaces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Index pour la table `employe_space_users`
--
ALTER TABLE `employe_space_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employe_id` (`employe_id`),
  ADD KEY `space_id` (`space_id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trajet_id` (`trajet_id`),
  ADD KEY `voyageur_id` (`voyageur_id`);

--
-- Index pour la table `trajets`
--
ALTER TABLE `trajets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conducteur_id` (`conducteur_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conducteur_id` (`conducteur_id`);

--
-- Index pour la table `voyageurs`
--
ALTER TABLE `voyageurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `conducteurs`
--
ALTER TABLE `conducteurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `employes`
--
ALTER TABLE `employes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `employe_spaces`
--
ALTER TABLE `employe_spaces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `employe_space_users`
--
ALTER TABLE `employe_space_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `trajets`
--
ALTER TABLE `trajets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `vehicules`
--
ALTER TABLE `vehicules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `voyageurs`
--
ALTER TABLE `voyageurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `employe_spaces`
--
ALTER TABLE `employe_spaces`
  ADD CONSTRAINT `employe_spaces_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `employe_space_users`
--
ALTER TABLE `employe_space_users`
  ADD CONSTRAINT `employe_space_users_ibfk_1` FOREIGN KEY (`employe_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `employe_space_users_ibfk_2` FOREIGN KEY (`space_id`) REFERENCES `employe_spaces` (`id`);

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`trajet_id`) REFERENCES `trajets` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`voyageur_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD CONSTRAINT `vehicules_ibfk_1` FOREIGN KEY (`conducteur_id`) REFERENCES `conducteurs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
