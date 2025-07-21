



<?php
session_start();
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = new PDO('mysql:host=localhost;dbname=ecoride', 'root', '');
    $email = $_POST['email'];
    $password = $_POST['password'];
    $stmt = $db->prepare("SELECT * FROM users WHERE email=? AND role='admin'");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['admin'] = $user['id'];
        header('Location: admin.php');
        exit;
    } else {
        $error = "Identifiants invalides";
    }
}
?>



<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion Admin - Ecoride</title>
    <link rel="stylesheet" href="../styles/main.css">
</head>
<body>
    <div class="login-container">
        <h2>Connexion Administrateur</h2>
        <!-- Un seul formulaire -->
<form id="admin-login-form" action="adminconnect.php" method="POST">
    <input type="email" name="email" placeholder="Email admin" required>
    <input type="password" name="password" placeholder="Mot de passe" required>
    <button type="submit">Se connecter</button>
    <div id="loader" style="display:none;color:green;">Connexion en cours...</div>
</form>
        <!-- Message d'erreur ici -->
                 <?php if ($error): ?>
            <div style="color:red;text-align:center;"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        </div>

  
</body>
</html>