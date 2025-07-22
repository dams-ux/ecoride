// Script pour créer un compte admin de test
// Pour utiliser ce script, ouvrez login.html et ouvrez la console du navigateur, puis copiez-collez ce code

// Fonction pour créer un compte admin temporaire
function createTestAdmin() {
    const adminUser = {
        id: 'admin-001',
        email: 'admin@ecoride.com',
        password: 'admin123', // Mot de passe temporaire
        prenom: 'Admin',
        nom: 'EcoRide',
        role: 'admin',
        telephone: '0123456789',
        date_creation: new Date().toISOString()
    };
    
    // Sauvegarder dans localStorage pour test
    localStorage.setItem('ecoride_test_admin', JSON.stringify(adminUser));
    console.log('Compte admin de test créé:');
    console.log('Email: admin@ecoride.com');
    console.log('Mot de passe: admin123');
    
    return adminUser;
}

// Fonction pour simuler la connexion admin
function loginAsAdmin() {
    const adminUser = {
        id: 'admin-001',
        email: 'admin@ecoride.com',
        prenom: 'Admin',
        nom: 'EcoRide',
        role: 'admin',
        telephone: '0123456789'
    };
    
    // Sauvegarder dans localStorage comme si on était connecté
    localStorage.setItem('ecoride_user', JSON.stringify(adminUser));
    console.log('Connecté en tant qu\'admin');
    
    // Rediriger vers le dashboard admin
    window.location.href = 'admin-dashboard.html';
}

// Créer le compte admin de test
createTestAdmin();

console.log('Pour vous connecter en tant qu\'admin:');
console.log('1. Utilisez les identifiants: admin@ecoride.com / admin123');
console.log('2. Ou tapez dans la console: loginAsAdmin()');
