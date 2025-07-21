<?php
session_start();
if (!isset($_SESSION['conducteur_id'])) {
    header('Location: login.php');
    exit;
}


$conducteur_id = $_SESSION['conducteur_id'];
$db = new PDO('mysql:host=localhost;dbname=ecoride', 'root', '');

// Définir la constante pour la requête
define('SQL_COUNT_VEHICULES', "SELECT COUNT(*) FROM vehicules WHERE conducteur_id = ?");
define('REDIRECT_COMPTECON', 'Location: comptecon.php');
// Ajout d'un véhicule
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ajouter_vehicule'])) {
    $marque = $_POST['marque'];
    $modele = $_POST['modele'];
    $plaque = $_POST['plaque'];
    $couleur = $_POST['couleur'];
    $annee = $_POST['annee'];
    $energie = $_POST['energie'];
    $stmt = $db->prepare(SQL_COUNT_VEHICULES);
    $stmt->execute([$conducteur_id]);
    $count = $stmt->fetchColumn();
    if ($count < 3) {
        $stmt = $db->prepare("INSERT INTO vehicules (conducteur_id, marque, modele, plaque, couleur, annee, energie) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$conducteur_id, $marque, $modele, $plaque, $couleur, $annee, $energie]);
    } else {
        $message = "Vous ne pouvez pas ajouter plus de 3 véhicules.";
    }
}

// Suppression d'un véhicule
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['supprimer_vehicule'])) {
    $vehicule_id = $_POST['vehicule_id'];
    $stmt = $db->prepare("DELETE FROM vehicules WHERE id = ? AND conducteur_id = ?");
    $stmt->execute([$vehicule_id, $conducteur_id]);
    header(REDIRECT_COMPTECON);
    exit;
}

// Ajout d'un trajet
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ajouter_trajet'])) {
    $depart = $_POST['depart'];
    $arrivee = $_POST['arrivee'];
    $date_depart = $_POST['date_depart'];
    $date_arriver = $_POST['date_arriver'];
    $tarif = $_POST['tarif'];
    $vehicule_id = $_POST['vehicule'];
    $nb_places = $_POST['nb_places'];
    // Vérifie que le conducteur a au moins un véhicule
    $stmt = $db->prepare(SQL_COUNT_VEHICULES);
    $stmt->execute([$conducteur_id]);
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        $stmt = $db->prepare("INSERT INTO trajets (conducteur_id, depart, arrivee, date_depart, date_arriver, tarif, vehicule_id, nb_places) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$conducteur_id, $depart, $arrivee, $date_depart, $date_arriver, $tarif, $vehicule_id, $nb_places]);
        header(REDIRECT_COMPTECON);
        exit;
    } else {
        $message = "Vous devez ajouter un véhicule avant de créer un trajet.";
    if ($count > 0) {
        $stmt = $db->prepare("INSERT INTO trajets (conducteur_id, depart, arrivee, date_depart, date_arriver, tarif, vehicule_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$conducteur_id, $depart, $arrivee, $date_depart, $date_arriver, $tarif, $vehicule_id]);
        header(REDIRECT_COMPTECON);
        exit;
    } else {
        $message = "Vous devez ajouter un véhicule avant de créer un trajet.";
    }
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['supprimer_trajet'])) {
    $trajet_id = $_POST['trajet_id'];
    $stmt = $db->prepare("DELETE FROM trajets WHERE id = ? AND conducteur_id = ?");
    $stmt->execute([$trajet_id, $conducteur_id]);
    header(REDIRECT_COMPTECON);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['commencer_trajet'])) {
    $trajet_id = $_POST['trajet_id'];
    // Ici tu peux mettre à jour le statut du trajet, par exemple :
    $stmt = $db->prepare("UPDATE trajets SET statut = 'en_cours' WHERE id = ? AND conducteur_id = ?");
    $stmt->execute([$trajet_id, $conducteur_id]);
    // Redirection ou autre action
    header("Location: comptecon.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>ECORIDE - Mon compte</title>
    <link rel="stylesheet" href="../styles/comptecon.css">
        <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/navfooter.css">
</head>
<body>
<?php include_once 'navbar.html'; ?>
<!-- HEADER CARDS -->
<div class="header-cards">
    <div class="conducteur-identite-card">
        <div class="conducteur-identite-infos">
            <span class="conducteur-identite-nom"><strong><?= htmlspecialchars($_SESSION['conducteur_nom'] ?? 'Nom*') ?></strong></span>
            <span class="conducteur-identite-prenom"><strong><?= htmlspecialchars($_SESSION['conducteur_prenom'] ?? 'Prénom*') ?></strong></span>
    </div>
        <div class="conducteur-identite-photo-block">
            <form method="post" enctype="multipart/form-data" class="photo-upload-wrapper">
                <img id="photo-preview" src="<?= htmlspecialchars($_SESSION['conducteur_photo'] ?? 'assets/default-avatar.png') ?>" alt="Photo conducteur" class="conducteur-photo">
                <label for="photo-upload" class="photo-upload-label">
                    <img src="assets/Camera ICON.png" alt="Ajouter une photo" class="photo-upload-icon">
                    <input type="file" id="photo-upload" name="photo" accept="image/*" style="display:none">
                </label>
                <button type="submit" name="upload_photo" class="btn-enregistrer-photo">Enregistrer la photo</button>
            </form>
            <div class="conducteur-photo-label">Photo *</div>
        </div>
    </div>
    <div class="conducteur-note-card">
        <div class="role-label">Conducteur</div>
        <div>
            <span class="note-label">Note</span>
            <span class="note-value">4</span>
            <span class="note-etoile">★</span>
        </div>
    </div>
</div>


<div class="main-grid">

    <!-- Nouveau trajet -->
    <div class="menu-bas-col nouveau-trajet">
        <div class="menu-bas-header">Nouveau trajet</div>
        <form method="post">
            <div>
                <label for="depart">Départ</label>
                <input type="text" id="depart" name="depart" required>
            </div>
            <div>
                <label for="arrivee">Arrivée</label>
                <input type="text" id="arrivee" name="arrivee" required>
            </div>
            <div>
                <label for="date_depart">Date de départ</label>
                <input type="date" id="date_depart" name="date_depart" required>
            </div>
            <div>
                <label for="date_arriver">Date d'arrivée</label>
                <input type="date" id="date_arriver" name="date_arriver" required>
            </div>
            <div>
                <label for="tarif">Tarif (€)</label>
                <input type="number" id="tarif" name="tarif" min="2" max="99" value="2" required>
            </div>
            <div>
            <label for="nb_places">Nombre de places</label>
            <input type="number" id="nb_places" name="nb_places" min="1" max="4" value="1" required>
            </div>
            <div>
                <label for="vehicule">Véhicule</label>
                <?php
                $stmt = $db->prepare("SELECT id, marque, modele, energie FROM vehicules WHERE conducteur_id = ?");
                $stmt->execute([$conducteur_id]);
                $vehicules = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (count($vehicules) > 0): ?>
                    <select name="vehicule" id="vehicule" required>
                        <option value="">Choisir un véhicule</option>
                        <?php foreach ($vehicules as $v):
                            $isEcolo = (isset($v['energie']) && strtolower($v['energie']) === 'electrique');
                            $label = ($isEcolo ? "🌱 " : "") . htmlspecialchars($v['marque']) . ' ' . htmlspecialchars($v['modele']);
                        ?>
                            <option value="<?= $v['id'] ?>"><?= $label ?></option>
                        <?php endforeach; ?>
                    </select>
                <?php else: ?>
                    <div style="margin-top:8px;">
                        <a href="#mes-vehicules" class="btn-ajouter-vehicule">Ajouter un véhicule</a>
                    </div>
                <?php endif; ?>
            </div>
            <button type="submit" name="ajouter_trajet" class="btn-rechercher">Valider</button>
        </form>
    </div>

    <!-- Mes véhicules -->
    <div class="menu-bas-col vehicule" id="mes-vehicules">
        <div class="menu-bas-header">Mes véhicules</div>
        <ul>
            <?php
            $stmt = $db->prepare("SELECT * FROM vehicules WHERE conducteur_id = ?");
            $stmt->execute([$conducteur_id]);
            foreach ($stmt as $v) {
                $isEcolo = (isset($v['energie']) && strtolower($v['energie']) === 'electrique');
                echo "<li>";
                if ($isEcolo) {
                    echo '<span title="Véhicule électrique" style="color:#2ecc40;font-size:1.2em;vertical-align:middle;">🌱</span> ';
                }
                echo "<b>" . htmlspecialchars($v['marque']) . "</b> " . htmlspecialchars($v['modele']) . " (" . htmlspecialchars($v['plaque']) . ", " . htmlspecialchars($v['couleur']) . ", " . htmlspecialchars($v['annee']) . ")";
                echo '<form method="post" style="display:inline;">
                        <input type="hidden" name="vehicule_id" value="' . $v['id'] . '">
                        <button type="submit" name="supprimer_vehicule" class="btn-supprimer-vehicule" onclick="return confirm(\'Supprimer ce véhicule ?\')">Supprimer</button>
            </form>';
                echo "</li>";
            }
            ?>
        </ul>
        <?php
        $stmt = $db->prepare("SELECT COUNT(*) FROM vehicules WHERE conducteur_id = ?");
        $stmt->execute([$conducteur_id]);
        $count = $stmt->fetchColumn();
        if ($count < 3): ?>
        <form method="post" class="vehicule-form">
            <h3>Ajouter un véhicule</h3>
            <label for="energie">Énergie</label>
            <select name="energie" id="energie" required>
                <option value="">Choisir</option>
                <option value="electrique">Électrique</option>
                <option value="thermique">Thermique</option>
            </select>
            <input type="text" name="marque" placeholder="Marque" required>
            <input type="text" name="modele" placeholder="Modèle" required>
            <input type="text" name="plaque" placeholder="Plaque" required>
            <input type="text" name="couleur" placeholder="Couleur" required>
            <input type="number" name="annee" placeholder="Année" min="1900" max="2099" required>
            <button type="submit" name="ajouter_vehicule">Ajouter</button>
        </form>
        <?php else: ?>
            <div style="color:red;">Vous ne pouvez pas ajouter plus de 3 véhicules.</div>
        <?php endif; ?>
    </div>

    <!-- Préférences -->
    <div class="menu-bas-col preferences">
        <div class="menu-bas-header">Mes préférences</div>
        <form method="post" class="preferences-form">
    <div class="preference-item">
        <label>Animal&nbsp;:</label>
        <input type="radio" name="animal" value="1" id="animal-oui"><label for="animal-oui">Oui</label>
        <input type="radio" name="animal" value="0" id="animal-non"><label for="animal-non">Non</label>
    </div>
    <div class="preference-item">
        <label>Fumeur&nbsp;:</label>
        <input type="radio" name="fumeur" value="1" id="fumeur-oui"><label for="fumeur-oui">Oui</label>
        <input type="radio" name="fumeur" value="0" id="fumeur-non"><label for="fumeur-non">Non</label>
    </div>
    <div class="preference-item">
        <label>Musique&nbsp;:</label>
        <input type="radio" name="musique" value="1" id="musique-oui"><label for="musique-oui">Oui</label>
        <input type="radio" name="musique" value="0" id="musique-non"><label for="musique-non">Non</label>
    </div>
    <div class="preference-item">
        <label>Discussion&nbsp;:</label>
        <input type="radio" name="discussion" value="1" id="discussion-oui"><label for="discussion-oui">Oui</label>
        <input type="radio" name="discussion" value="0" id="discussion-non"><label for="discussion-non">Non</label>
    </div>
        <button type="submit" name="enregistrer_preferences" class="btn-preferences">Enregistrer</button>
    </form>
</div>

    <!-- Historique -->
    <div class="menu-bas-col historique">
        <div class="menu-bas-header">Historique</div>
        <ul>
            <li>Trajet 1 : Narbonne - Perpignan</li>
            <li>Trajet 2 : Paris - Perpignan</li>
            <li>Trajet 3 : Narbonne - Bézier</li>
        </ul>
    </div>

    <!-- Avis -->
    <div class="menu-bas-col avis">
        <div class="menu-bas-header">Mes avis</div>
        <ul>
            <li>Note 5 ★ - Super trajet !</li>
            <li>Note 4 ★ - Très sympa</li>
        </ul>
    </div>

    <!-- Mon trajet -->

<div class="menu-bas-col trajet">
    <div class="menu-bas-header">Mes trajets</div>
    <div class="trajets-scroll">
    <?php
    $stmt = $db->prepare("SELECT t.*, v.marque, v.modele FROM trajets t JOIN vehicules v ON t.vehicule_id = v.id WHERE t.conducteur_id = ? ORDER BY t.date_depart DESC");
    $stmt->execute([$conducteur_id]);
    $trajets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($trajets) {
        foreach ($trajets as $trajet) {
            echo '<div class="trajet-card">';
            echo '<div><b>Départ :</b> ' . htmlspecialchars($trajet['depart']) . '</div>';
            echo '<div><b>Arrivée :</b> ' . htmlspecialchars($trajet['arrivee']) . '</div>';
            echo '<div><b>Date départ :</b> ' . htmlspecialchars($trajet['date_depart']) . '</div>';
            echo '<div><b>Date arrivée :</b> ' . htmlspecialchars($trajet['date_arriver']) . '</div>';
            echo '<div><b>Tarif :</b> ' . htmlspecialchars($trajet['tarif']) . ' €</div>';
            echo '<div><b>Véhicule :</b> ' . htmlspecialchars($trajet['marque']) . ' ' . htmlspecialchars($trajet['modele']) . '</div>';
             echo '<div><b>Places :</b> ' . htmlspecialchars($trajet['nb_places']) . '</div>'; // <-- AJOUTE CETTE LIGNE
      // Boutons
            echo '<form method="post" style="display:inline-block;margin-top:8px;">';
            echo '<input type="hidden" name="trajet_id" value="' . $trajet['id'] . '">';
            echo '<button type="submit" name="supprimer_trajet" class="btn-supprimer-trajet" onclick="return confirm(\'Supprimer ce trajet ?\')">Supprimer</button> ';
            echo '<button type="submit" name="commencer_trajet" class="btn-commencer-trajet">Commencer</button>';
            echo '</form>';
            echo '</div>';
        }
    } else {
        echo '<div>Aucun trajet enregistré.</div>';
    }
    ?>
    </div>
</div>

</body>
</html>