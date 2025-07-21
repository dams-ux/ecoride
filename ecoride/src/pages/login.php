<?php
session_start();
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $db = new PDO('mysql:host=localhost;dbname=ecoride', 'root', '');

    // Vérifier si l'utilisateur est conducteur
    $stmt = $db->prepare("SELECT id, nom, prenom, photo, password FROM conducteurs WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['conducteur_id'] = $user['id'];
        $_SESSION['conducteur_nom'] = $user['nom'];
        $_SESSION['conducteur_prenom'] = $user['prenom'];
        $_SESSION['conducteur_photo'] = $user['photo'] ?: 'assets/default-avatar.png';
        header('Location: comptecon.php');
        exit;
    } else {
        // Vérifier si c'est un voyageur
        $stmt = $db->prepare("SELECT id, nom, prenom, photo, password FROM voyageurs WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['voyageur_id'] = $user['id'];
            $_SESSION['voyageur_nom'] = $user['nom'];
            $_SESSION['voyageur_prenom'] = $user['prenom'];
            $_SESSION['voyageur_photo'] = $user['photo'] ?: 'assets/default-avatar.png';
            header('Location: comptevoyageur.php');
            exit;
        } else {
            $error = "Email ou mot de passe incorrect.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Page de connexion pour ECORIDE, une plateforme de covoiturage écoresponsable.">
    <meta charset="UTF-8">
    <title>Connexion - ECORIDE</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/navfooter.css">
 
</head>
<body>
<?php include_once 'navbar.html'; ?>
    <div class="login-container">
        <h2>Connexion</h2>
        <?php if ($error): ?>
            <div style="color:red;"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="post" action="login.php">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Se connecter</button>
        </form>
    </div>

</body>
</html>


