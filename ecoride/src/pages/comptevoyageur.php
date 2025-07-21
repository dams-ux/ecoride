
<?php
session_start();
if (!isset($_SESSION['voyageur_id'])) {
    header('Location: login.php');
    exit;
}

$voyageur_id = $_SESSION['voyageur_id'];
$db = new PDO('mysql:host=localhost;dbname=ecoride', 'root', '');


if (isset($_POST['upload_photo']) && isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array($ext, $allowed)) {
        $upload_error = "Format de fichier non autorisé.";
    } else {
        $target = 'assets/voyageur_' . $voyageur_id . '.' . $ext;
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $target)) {
            $stmt = $db->prepare("UPDATE voyageurs SET photo = ? WHERE id = ?");
            $stmt->execute([$target, $voyageur_id]);
            $_SESSION['voyageur_photo'] = $target;
            header('Location: comptevoyageur.php');
            exit;
        } else {
            $upload_error = "Erreur lors de l'enregistrement du fichier.";
        }
    }

    // Met à jour la photo en base
    $stmt = $db->prepare("UPDATE voyageurs SET photo = ? WHERE id = ?");
    $stmt->execute([$target, $voyageur_id]);
    $_SESSION['voyageur_photo'] = $target;
    header('Location: comptevoyageur.php');
    exit;
}

// Récupération des informations du voyageur
$stmt = $db->prepare("SELECT * FROM voyageurs WHERE id = ?");
$stmt->execute([$voyageur_id]);
$voyageur = $stmt->fetch(PDO::FETCH_ASSOC);

?>

<!-- ...le reste du code HTML... -->

<!-- filepath: c:\Users\damie\OneDrive\Bureau\DP Project\ecoride\src\pages\comptevoyageur.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>ECORIDE - Mon compte voyageur</title>
    
    <link rel="stylesheet" href="../styles/navfooter.css">
    <link rel="stylesheet" href="../styles/voyageur.css">

</head>
<body>
<?php include_once 'navbar.html'; ?>
<div class="main-content">
    <div class="voyageur-identite-row">
        <!-- Bloc avis à gauche -->
        <div class="voyageur-avis-col">
            <div class="avis-card">
                <h3>Avis a donner</h3>
                <div class="avis-item">
                    <div class="avis-user">Paul D.</div>
                    <div class="avis-note">⭐⭐⭐⭐⭐</div>
                    <div class="avis-comment">Super trajet, ponctuelle et agréable !</div>
                    <div class="avis-actions">
                        <button class="btn-modifier-avis">Modifier</button>
                        <button class="btn-supprimer-avis">Supprimer</button>
                        <button class="btn-valider-avis">Valider</button>
                    </div>
                </div>
                <!-- ... -->
            </div>
        </div>
        <!-- Colonne droite : Identité -->
        <div class="voyageur-identite-card">
            <div class="voyageur-identite-infos">
                <span class="voyageur-identite-nom"><strong><?= htmlspecialchars($_SESSION['voyageur_nom'] ?? 'Nom*') ?></strong></span>
                <span class="voyageur-identite-prenom"><strong><?= htmlspecialchars($_SESSION['voyageur_prenom'] ?? 'Prénom*') ?></strong></span>
            </div>
            <div class="voyageur-identite-photo-block">
                <form method="post" enctype="multipart/form-data" class="photo-upload-wrapper">
                    <label for="photo-upload" class="photo-upload-label">
                        <img id="photo-preview" src="<?= htmlspecialchars($_SESSION['voyageur_photo'] ?? 'assets/default-avatar.png') ?>" alt="Photo voyageur" class="voyageur-photo">
                        <img src="assets/Camera ICON.png" alt="Ajouter une photo" class="photo-upload-icon">
                        <input type="file" id="photo-upload" name="photo" accept="image/*" style="display:none" required>
                    </label>
                    <button type="submit" name="upload_photo" class="btn-enregistrer-photo">Enregistrer la photo</button>
                </form>
                <div class="voyageur-photo-label">Photo *</div>
            </div>
        </div>
    </div>
    <!-- Bloc notes ou autres contenus ici -->
</div>

<div class="voyageur-trajets-futurs">
    <div class="trajets-card">
        <h3>Mes futurs trajets acceptés</h3>
        <!-- Exemple de trajet, à remplacer par une boucle PHP -->
        <div class="trajet-item">
            <div class="trajet-info">
                <span class="trajet-date">25/07/2025</span>
                <span class="trajet-ville">Paris → Lyon</span>
                <span class="trajet-prix">Prix : 15€</span>
                <span class="trajet-heure">Heure : 14h00</span>
            </div>
            <div class="trajet-actions">
                <button class="btn-annuler-trajet">Annuler</button>
            </div>
        </div>
        <!-- ... -->
        <!-- Si aucun trajet -->
        <!-- <div class="trajet-item trajet-vide">Aucun trajet à venir.</div> -->
    </div>
</div>








<footer class="footer-ecoride">
    <p>Mentions Légales</p>
    <p>ecoridenature@hotmail.fr</p>
</footer>
</body>
</html>