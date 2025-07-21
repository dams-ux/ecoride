

<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);



$db = new PDO('mysql:host=localhost;dbname=ecoride', 'root', '');

// Récupère tous les trajets avec infos conducteur et véhicule
$stmt = $db->query("SELECT t.*, c.nom AS conducteur_nom, c.prenom AS conducteur_prenom, v.marque, v.modele
    FROM trajets t
    JOIN conducteurs c ON t.conducteur_id = c.id
    JOIN vehicules v ON t.vehicule_id = v.id
    ORDER BY t.date_depart ASC");
$trajets = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $db->query("SELECT t.*, c.nom AS conducteur_nom, c.prenom AS conducteur_prenom, c.photo AS conducteur_photo, v.marque, v.modele, v.energie,
    (SELECT AVG(a.note) FROM avis a WHERE a.conducteur_id = c.id) AS note_moyenne
    FROM trajets t
    JOIN conducteurs c ON t.conducteur_id = c.id
    JOIN vehicules v ON t.vehicule_id = v.id
    ORDER BY t.date_depart ASC");
$trajets = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>
    <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECORIDE - La route verte</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/navfooter.css">
    <link rel="stylesheet" href="../styles/covoiturage.css">
    <!-- Dans le <head> -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
 
</head>
<body>

    <?php include_once 'navbar.html'; ?>

    <!-- Bandeau principal -->
<header style="background:#f2efc6;padding:0;margin:0;">
    <img src="assets/fond2.png" alt="Logo Ecoride" style="width:100%;display:block;">
</header>
<div class="barre-recherche">
    <label for="depart" style="position:absolute;left:-9999px;">Départ</label>
    <input id="depart" type="text" placeholder="Départ">

    <label for="destination" style="position:absolute;left:-9999px;">Destination</label>
    <input id="destination" type="text" placeholder="Destination">

    <label for="passagers" style="position:absolute;left:-9999px;">Nombre de passagers</label>
    <select id="passagers" title="Nombre de passagers">
        <option>Passagers</option>
        <option>1</option>
        <option>2</option>
        <option>3+</option>
    </select>

    <label for="date" style="position:absolute;left:-9999px;">Date du trajet</label>
    <input id="date" type="date" title="Date du trajet">

    <button>🔍</button>
</div>


<div class="main-content">
    <aside class="filters">
        <!-- Filtres ici -->
        <h4>Filtres</h4>
        <div style="margin-top:10px;">
            <strong>Écologique</strong><br>
            <input type="checkbox" id="eco"> <label for="eco">Véhicule électrique</label>
        </div>
        <div style="margin-top:10px;">
            <strong>Temps de trajet</strong><br>
            <input type="radio" name="temps" id="temps-croissant"> <label for="temps-croissant">Croissant</label>
        </div>
        <div style="margin-top:10px;">
            <strong>Nombre de place</strong><br>
            <input type="radio" name="places" id="places-decroissant"> <label for="places-decroissant">Décroissant</label>
        </div>
        <div style="margin-top:10px;">
            <strong>Note conducteur</strong><br>
            <input type="radio" name="note" id="note-5-1"> <label for="note-5-1">De 5 à 1</label>
        </div>
</aside>

   <div class="trajets-section">
        <h2 class="trajets-titre">Trajets disponibles</h2>
        <section class="rides-info">
    <div class="trajets-scroll">
        <?php if ($trajets):
foreach ($trajets as $trajet): ?>
<?php
$date_depart = !empty($trajet['date_depart']) ? new DateTime($trajet['date_depart']) : null;
$date_arriver = !empty($trajet['date_arriver']) ? new DateTime($trajet['date_arriver']) : null;
$duree = 'Durée inconnue';
if ($date_depart && $date_arriver) {
    $interval = $date_depart->diff($date_arriver);
    $total_minutes = ($interval->days * 24 * 60) + ($interval->h * 60) + $interval->i;
    $h = intdiv($total_minutes, 60);
    $i = $total_minutes % 60;
    if ($h > 0 && $i > 0)      $duree = "{$h}h{$i}min";
    elseif ($h > 0)            $duree = "{$h}h";
    elseif ($i > 0)            $duree = "{$i}min";
    else                       $duree = "0min";
}
?>
    ?>
    <div class="ride-info">
         <span class="duree-api"
        data-date-depart="2025-07-21 08:00:00"
        data-depart="Paris"
        data-arrivee="Lyon"
    >Calcul...</span>
        <img src="<?= htmlspecialchars($trajet['conducteur_photo'] && file_exists($trajet['conducteur_photo']) ? $trajet['conducteur_photo'] : '../assets/default-avatar.png') ?>"
             alt="<?= htmlspecialchars($trajet['conducteur_nom']) ?>"
             class="ride-avatar">
        <div class="ride-details">
            <strong><?= htmlspecialchars($trajet['conducteur_nom']) ?> <?= htmlspecialchars($trajet['conducteur_prenom']) ?></strong>
            <span>★ <?= isset($trajet['note_moyenne']) && $trajet['note_moyenne'] !== null ? htmlspecialchars(round($trajet['note_moyenne'],1)) : '4' ?></span><br>
            <span><?= htmlspecialchars($trajet['nb_places'] ?? 'X') ?> place(s) restantes</span>
            <?php if (isset($trajet['energie']) && strtolower($trajet['energie']) === 'electrique'): ?>
                <span class="eco-label">Ecologique</span>
            <?php endif; ?>
            <br>
    <span class="duree-api"
        data-date-depart="<?= htmlspecialchars($trajet['date_depart']) ?>"
        data-depart="<?= htmlspecialchars($trajet['depart']) ?>"
        data-arrivee="<?= htmlspecialchars($trajet['arrivee']) ?>"
    >Calcul...</span>
            <span><?= htmlspecialchars($trajet['tarif']) ?> €</span>
            <span><?= htmlspecialchars($trajet['marque']) ?> <?= htmlspecialchars($trajet['modele']) ?></span>
        </div>
        <div>
            <button class="btn-detail">Détail</button>
            <button class="btn-participer">Participer</button>
        </div>
    </div>
<?php endforeach; ?>
        <?php else: ?>
            <div>Aucun trajet disponible.</div>
        <?php endif; ?>
    </section>
</div>


    <footer class="footer-ecoride">
       <p>Mentions Légales</p>
       <p> ecoridenature@hotmail.fr</p>
    </footer>


    <script src="../scripts/fonction.js"></script>
    <script src="../scripts/trajet.js"></script>
</body>
</html>