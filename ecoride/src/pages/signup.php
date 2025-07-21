<?php


ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'navbar.html';
$signup_message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = new PDO('mysql:host=localhost;dbname=ecoride', 'root', '');
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = $_POST['role']; // 'voyageur' ou 'conducteur'

    if ($role === 'voyageur') {
        $stmt = $db->prepare("INSERT INTO voyageurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)");
        $success = $stmt->execute([$nom, $prenom, $email, $password]);
    } elseif ($role === 'conducteur') {
        $stmt = $db->prepare("INSERT INTO conducteurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)");
        $success = $stmt->execute([$nom, $prenom, $email, $password]);
    } else {
        $success = false;
    }

    if ($success) {
        $signup_message = "Inscription réussie ! Vous pouvez vous connecter.";
    } else {
        $signup_message = "Erreur lors de l'inscription.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - Ecoride</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/navfooter.css">
    
    
</head>
<body>
<?php include_once 'navbar.html'; ?>
    <div class="container">
        <header>
            <h1>Créer un compte</h1>
        </header>

        <?php if ($signup_message): ?>
            <div style="color:green;"><?= htmlspecialchars($signup_message) ?></div>
        <?php endif; ?>
<form method="POST" onsubmit="return checkPasswordStrength();">
    <div class="form-group">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom" required>
    </div>
    <div class="form-group">
        <label for="prenom">Prénom :</label>
        <input type="text" id="prenom" name="prenom" required>
    </div>
    <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required>
        <div class="password-info">
            Le mot de passe doit contenir 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole.
        </div>
        <div class="generator-row">
            <button type="button" onclick="generatePassword()" title="Générer un mot de passe">
                &#8635; Générateur de mot de passe
            </button>
            <input type="text" id="generated-password" readonly placeholder="Mot de passe généré" onclick="copyPassword()">
        </div>
        <div id="password-error" style="color:#ff5555; font-size:0.95em; margin-top:4px;"></div>
    </div>
    <div class="form-group">
        <label for="confirm_password">Confirmation mot de passe :</label>
        <input type="password" id="confirm_password" name="confirm_password" required>
    </div>
    <div class="form-group">
        <label for="role">Je suis :</label>
        <select id="role" name="role" required>
            <option value="">Choisir un rôle</option>
            <option value="voyageur">Voyageur</option>
            <option value="conducteur">Conducteur</option>
        </select>
    </div>
    <button type="submit">Valider</button>
</form>
        <p>Déjà un compte ? <a href="login.html">Connectez-vous ici</a>.</p>
    </div>

</body>
</html>

<?php
// Après avoir créé ou validé le conducteur :
session_start();
$_SESSION['conducteur_id'] = $conducteur_id; // $conducteur_id = l'ID du conducteur connecté
header('Location: comptecon.php');
exit;
?>