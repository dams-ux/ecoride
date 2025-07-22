
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-user').forEach(function(drop){
        drop.querySelector('.navbar-icon-user').addEventListener('click', function(e){
            e.stopPropagation();
            drop.classList.toggle('open');
        });
    });
    document.addEventListener('click', function(){
        document.querySelectorAll('.dropdown-user.open').forEach(function(drop){
            drop.classList.remove('open');
        });
    });
});





function checkPasswordStrength() {
    const pwd = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;
    const errorDiv = document.getElementById('password-error');
    // Regex : au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 symbole, 8 caractères mini
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongRegex.test(pwd)) {
        errorDiv.textContent = "Le mot de passe n'est pas assez fort.";
        return false;
    }
    if (pwd !== confirm) {
        errorDiv.textContent = "Les mots de passe ne correspondent pas.";
        return false;
    }
    errorDiv.textContent = "";
    return true;
}

// function generatePassword(length = 12) {
//     const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
//     let password = "";
//     while (true) {
//         password = "";
//         for (let i = 0; i < length; i++) {
//             password += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
//         // Vérifie la force du mot de passe généré
//         const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//         if (strongRegex.test(password)) break;
//     }
//     document.getElementById('generated-password').value = password;
//     document.getElementById('password').value = password;
//     document.getElementById('confirm_password').value = password;
//     document.getElementById('password-error').textContent = "";
// }

// function copyPassword() {
//     const input = document.getElementById('generated-password');
//     input.select();
//     document.execCommand('copy');
// }




function generatePassword(length = 12) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*";
    let all = lower + upper + numbers + symbols;

    let password = "";
    // Garantir au moins un de chaque
    password += lower[Math.floor(Math.random() * lower.length)];
    password += upper[Math.floor(Math.random() * upper.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = 4; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }
    // Mélange le mot de passe
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    document.getElementById('password').value = password;
    document.getElementById('confirm_password').value = password;
    document.getElementById('generated-password').value = password;
    document.getElementById('password-error').textContent = "";
}
function copyPassword() {
    const input = document.getElementById('generated-password');
    input.select();
    document.execCommand('copy');
}

function previewPhoto(event) {
    const input = event.target;
 const preview = document.getElementById('photo-preview');
if (input.files?.[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
        preview.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}
}
document.getElementById('form-recherche-covoiturage').onsubmit = async function(e) {
    e.preventDefault();
    const depart = document.getElementById('depart').value;
    const arrivee = document.getElementById('arrivee').value;
    const date = document.getElementById('date').value;
    const tarif = document.getElementById('tarif').value;
    const vehicule = document.getElementById('vehicule').options[document.getElementById('vehicule').selectedIndex].text;

    // Exemple d'appel API (remplace par ton vrai endpoint si besoin)
    // const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${depart}`);
    // const data = await response.json();
    // Ici tu peux faire un calcul de distance, durée, etc.

    // Affiche la proposition
    document.getElementById('trajet-info').textContent =
        `${depart} → ${arrivee} le ${date} | Tarif : ${tarif} € | Véhicule : ${vehicule}`;
    document.getElementById('proposition-trajet').style.display = 'block';
};

function confirmerTrajet() {
    alert("Trajet accepté et ajouté dans la liste de covoiturage !");
    document.getElementById('proposition-trajet').style.display = 'none';
}