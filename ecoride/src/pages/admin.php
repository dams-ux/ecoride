<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header('Location: adminconnect.php');
    exit;
}
// Gestion de la création d'un espace employé
$employe_message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'create_employe') {
    $db = new PDO('mysql:host=localhost;dbname=ecoride', 'root', '');
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $stmt = $db->prepare("INSERT INTO employes (nom, email, password) VALUES (?, ?, ?)");
    if ($stmt->execute([$nom, $email, $password])) {
        $employe_message = "Employé créé avec succès !";
    }
    } else {
        $employe_message = "Erreur lors de la création de l'employé.";
    }

?>



<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Espace Admin - Ecoride</title>
    <link rel="stylesheet" href="../styles/main.css">
</head>
<body>
    <nav class="navbar-ecoride">
        <span>Ecoride - Espace Admin</span>
        <a href="/admin/logout" class="navbar-btn">Déconnexion</a>
    </nav>
    <main class="admin-main">
        <h1>Tableau de bord Administrateur</h1>
        <section class="admin-section">
            <h2>Créer un espace employé</h2>
            <form id="create-space-form">
                <input type="text" name="nom" placeholder="Nom de l'espace" required>
                <textarea name="description" placeholder="Description"></textarea>
                <button type="submit">Créer l'espace</button>
            </form>
        </section>
        <section class="admin-section">
            <h2>Liste des employés</h2>
            <div id="employe-list">
                <!-- Liste dynamique JS -->
            </div>
        </section>
        <section class="admin-section">
            <h2>Performances du site</h2>
            <div id="stats">
                <!-- Statistiques dynamiques JS -->
            </div>
        </section>
    </main>

<!-- Générateur de mot de passe -->
<input type="text" id="generated-password" placeholder="Mot de passe généré" readonly>
<button type="button" onclick="generatePassword()">Générer un mot de passe</button>

<script>
function generatePassword(length = 12) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('generated-password').value = password;
}
</script>



    <div class="admin-section">
        <h2>Créer un compte employé</h2>
        <form method="POST">
            <input type="hidden" name="action" value="create_employe">
            <input type="text" name="nom" placeholder="Nom" required>
            <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Mot de passe" required>
        <button type="submit">Créer l’employé</button>
    </form>
    <?php if (!empty($employe_message)): ?>
        <div style="color:green;"><?= htmlspecialchars($employe_message) ?></div>
    <?php endif; ?>




    <script src="../scripts/admin.js"></script>
</body>
</html>