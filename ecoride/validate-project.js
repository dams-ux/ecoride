// Script de validation EcoRide - Test des fonctionnalités
console.log('🔍 Validation du projet EcoRide...\n');

// Test 1: Vérification des fichiers de base de données
const fs = require('fs');
const path = require('path');

function checkFile(filePath, description) {
    try {
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            console.log(`✅ ${description}: OK (${Math.round(stats.size/1024)}KB)`);
            return true;
        } else {
            console.log(`❌ ${description}: MANQUANT`);
            return false;
        }
    } catch (error) {
        console.log(`❌ ${description}: ERREUR - ${error.message}`);
        return false;
    }
}


console.log('📄 Vérification des fichiers de base de données:');
checkFile(path.join(__dirname, 'database', 'ecoride_mysql.sql'), 'Base MySQL principale');
checkFile(path.join(__dirname, 'database', 'mysql_complements.sql'), 'Compléments MySQL');
checkFile(path.join(__dirname, 'database', 'setup_supabase.sql'), 'Base Supabase');

console.log('\n📝 Vérification des guides:');
checkFile(path.join(__dirname, 'DUAL-DATABASE-GUIDE.md'), 'Guide bases de données');
checkFile(path.join(__dirname, 'MIGRATION-GUIDE.md'), 'Guide de migration');
checkFile(path.join(__dirname, 'SUPABASE-GUIDE.md'), 'Guide Supabase');
checkFile(path.join(__dirname, 'CORRECTIONS-APPLIED.md'), 'Résumé des corrections');

console.log('\n🔧 Vérification des scripts JavaScript:');
checkFile(path.join(__dirname, 'src', 'scripts', 'supabase-client.js'), 'Client Supabase');
checkFile(path.join(__dirname, 'src', 'scripts', 'auth-new.js'), 'Authentification moderne');
checkFile(path.join(__dirname, 'src', 'scripts', 'database.js'), 'Base de données simulation');

console.log('\n📱 Vérification des pages HTML:');
checkFile(path.join(__dirname, 'src', 'pages', 'signup-new.html'), 'Inscription moderne');
checkFile(path.join(__dirname, 'src', 'pages', 'comptecon-new.html'), 'Dashboard conducteur');
checkFile(path.join(__dirname, 'src', 'pages', 'comptevoyageur-new.html'), 'Dashboard voyageur');
checkFile(path.join(__dirname, 'src', 'pages', 'login.html'), 'Page de connexion');

console.log('\n🎯 Vérification du contenu des bases:');


// Test du contenu MySQL
try {
    const mysqlContent = fs.readFileSync(path.join(__dirname, 'database', 'ecoride_mysql.sql'), 'utf8');
    const mysqlComplementContent = fs.readFileSync(path.join(__dirname, 'database', 'mysql_complements.sql'), 'utf8');
    
    if (mysqlContent.includes('pauldupont@hotmail.fr') && mysqlContent.includes('juliepop@hotmail.fr')) {
        console.log('✅ Base MySQL: Utilisateurs Paul et Julie présents');
    } else {
        console.log('❌ Base MySQL: Utilisateurs manquants');
    }
    
    if (mysqlComplementContent.includes('admin@ecoride.fr') && mysqlComplementContent.includes('robert@ecoride.fr')) {
        console.log('✅ Compléments MySQL: Comptes admin présents');
    } else {
        console.log('❌ Compléments MySQL: Comptes admin manquants');
    }
} catch (error) {
    console.log('❌ Erreur lecture fichiers MySQL:', error.message);
}

// Test du contenu Supabase
try {
    const supabaseContent = fs.readFileSync(path.join(__dirname, 'database', 'setup_supabase.sql'), 'utf8');
    
    const hasAdmin = supabaseContent.includes('admin@ecoride.fr');
    const hasPaul = supabaseContent.includes('pauldupont@hotmail.fr');
    const hasJulie = supabaseContent.includes('juliepop@hotmail.fr');
    const hasRobert = supabaseContent.includes('robert@ecoride.fr');
    
    if (hasAdmin && hasPaul && hasJulie && hasRobert) {
        console.log('✅ Base Supabase: Tous les utilisateurs présents');
    } else {
        console.log('❌ Base Supabase: Utilisateurs manquants');
    }
} catch (error) {
    console.log('❌ Erreur lecture fichier Supabase:', error.message);
}

console.log('\n🎉 Validation terminée!');
console.log('\n📋 Résumé des comptes utilisateur:');
console.log('🔧 Admin: admin@ecoride.fr / ecoride2025');
console.log('🔧 Manager: robert@ecoride.fr / voiture');
console.log('🚗 Conducteur: pauldupont@hotmail.fr / Mavoiture6+');
console.log('👥 Voyageur: juliepop@hotmail.fr / Monvoyage6+');

console.log('\n🚀 Prochaines étapes:');
console.log('1. Pour test local: Installer XAMPP et importer les 2 fichiers MySQL');
console.log('2. Pour production: Créer projet Supabase et importer setup_supabase.sql');
console.log('3. Configurer les clés API dans supabase-client.js');
console.log('4. Tester l\'inscription et la connexion');
