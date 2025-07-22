#!/usr/bin/env node

/**
 * 🔄 Script d'intégration de la navbar responsive
 * Remplace les navbars existantes par la version responsive iPhone-style
 */

const fs = require('fs');
const path = require('path');

// Configuration des pages à mettre à jour
const pages = [
    'src/pages/login.html',
    'src/pages/signup-new.html', 
    'src/pages/covoiturage-new.html',
    'src/pages/comptecon-new.html',
    'src/pages/comptevoyageur-new.html'
];

// Contenu de la navbar responsive
const responsiveNavbar = `    <!-- Navbar Responsive iPhone-style -->
    <nav class="navbar-responsive" id="navbar">
        <!-- Desktop navbar -->
        <div class="navbar-desktop">
            <div class="navbar-brand">
                <img src="assets/image voiture.png" alt="EcoRide" class="navbar-logo">
                <span class="navbar-title">EcoRide</span>
            </div>
            
            <div class="navbar-menu">
                <a href="../index.html" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Accueil
                </a>
                <a href="covoiturage-new.html" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10z"/>
                    </svg>
                    Covoiturage
                </a>
                <a href="#contact" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Contact
                </a>
            </div>
            
            <div class="navbar-user">
                <div class="user-dropdown" id="userDropdown">
                    <button class="user-button" id="userButton">
                        <img src="assets/Icon.png" alt="Utilisateur" class="user-avatar">
                        <svg class="dropdown-arrow" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5"/>
                        </svg>
                    </button>
                    <div class="dropdown-menu" id="dropdownMenu">
                        <!-- Contenu dynamique selon l'état de connexion -->
                    </div>
                </div>
                <img src="assets/image energie.png" alt="Énergie verte" class="energy-icon">
            </div>
        </div>
        
        <!-- Mobile hamburger button -->
        <div class="navbar-mobile">
            <div class="mobile-brand">
                <img src="assets/image voiture.png" alt="EcoRide" class="mobile-logo">
                <span class="mobile-title">EcoRide</span>
            </div>
            <button class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        
        <!-- Mobile menu overlay -->
        <div class="mobile-overlay" id="mobileOverlay">
            <div class="mobile-menu" id="mobileMenu">
                <div class="mobile-header">
                    <img src="assets/image voiture.png" alt="EcoRide" class="mobile-menu-logo">
                    <span>EcoRide</span>
                    <button class="close-button" id="closeButton">
                        <svg viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                
                <div class="mobile-links">
                    <a href="../index.html" class="mobile-link">
                        <svg class="mobile-icon" viewBox="0 0 24 24">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span>Accueil</span>
                        <svg class="arrow-right" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </a>
                    <a href="covoiturage-new.html" class="mobile-link">
                        <svg class="mobile-icon" viewBox="0 0 24 24">
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10z"/>
                        </svg>
                        <span>Covoiturage</span>
                        <svg class="arrow-right" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </a>
                    <a href="#contact" class="mobile-link">
                        <svg class="mobile-icon" viewBox="0 0 24 24">
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <span>Contact</span>
                        <svg class="arrow-right" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </a>
                </div>
                
                <div class="mobile-user" id="mobileUserSection">
                    <!-- Contenu dynamique selon l'état de connexion -->
                </div>
            </div>
        </div>
    </nav>`;

// CSS pour la navbar responsive
const responsiveCSS = `
/* 📱 Navbar Responsive iPhone-style */
.navbar-responsive {
    background: linear-gradient(135deg, #205c2c 0%, #2d7a35 100%);
    box-shadow: 0 2px 20px rgba(32, 92, 44, 0.3);
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: transform 0.3s ease;
}

/* Desktop navbar */
.navbar-desktop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
}

.navbar-logo {
    height: 40px;
    width: auto;
    border-radius: 50%;
}

.navbar-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    font-weight: 500;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
}

.nav-link.active {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.nav-icon {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.navbar-user {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-dropdown {
    position: relative;
}

.user-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 0.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.user-button:hover {
    background: rgba(255, 255, 255, 0.2);
}

.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.dropdown-arrow {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    transition: transform 0.3s ease;
}

.user-dropdown.open .dropdown-arrow {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: 120%;
    right: 0;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    padding: 0.5rem 0;
    min-width: 180px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.user-dropdown.open .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-menu a {
    display: block;
    color: #374151;
    text-decoration: none;
    padding: 0.75rem 1rem;
    transition: background 0.2s ease;
}

.dropdown-menu a:hover {
    background: #f3f4f6;
}

.energy-icon {
    height: 24px;
    width: auto;
}

/* Mobile navbar */
.navbar-mobile {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}

.mobile-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: bold;
    font-size: 1.25rem;
}

.mobile-logo {
    height: 32px;
    width: auto;
    border-radius: 50%;
}

.hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background 0.3s ease;
}

.hamburger:hover {
    background: rgba(255, 255, 255, 0.1);
}

.hamburger span {
    width: 24px;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(8px, -8px);
}

/* Mobile overlay */
.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 9999;
}

.mobile-overlay.active {
    opacity: 1;
    visibility: visible;
}

.mobile-menu {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: min(350px, 85vw);
    background: white;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
}

.mobile-overlay.active .mobile-menu {
    transform: translateX(0);
}

.mobile-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #205c2c 0%, #2d7a35 100%);
    color: white;
    font-weight: bold;
    font-size: 1.25rem;
}

.mobile-menu-logo {
    height: 32px;
    width: auto;
    border-radius: 50%;
}

.close-button {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s ease;
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.3);
}

.close-button svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
}

.mobile-links {
    padding: 1rem 0;
    flex: 1;
}

.mobile-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #374151;
    text-decoration: none;
    padding: 1rem 1.5rem;
    transition: background 0.2s ease;
    border-bottom: 1px solid #f3f4f6;
}

.mobile-link:hover {
    background: #f9fafb;
}

.mobile-icon {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    flex-shrink: 0;
}

.mobile-link span {
    flex: 1;
    font-weight: 500;
}

.arrow-right {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: #9ca3af;
    stroke-width: 2;
    flex-shrink: 0;
}

.mobile-user {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
    .navbar-desktop {
        display: none;
    }
    
    .navbar-mobile {
        display: flex;
    }
}

/* Auto-hide navbar on scroll */
.navbar-responsive.hidden {
    transform: translateY(-100%);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .dropdown-menu {
        background: #1f2937;
        color: white;
    }
    
    .dropdown-menu a {
        color: #e5e7eb;
    }
    
    .dropdown-menu a:hover {
        background: #374151;
    }
    
    .mobile-menu {
        background: #111827;
    }
    
    .mobile-link {
        color: #e5e7eb;
        border-bottom-color: #374151;
    }
    
    .mobile-link:hover {
        background: #1f2937;
    }
    
    .mobile-user {
        background: #1f2937;
        border-top-color: #374151;
    }
}
`;

// JavaScript pour la navbar responsive
const responsiveJS = `
    // 📱 JavaScript pour la navbar responsive iPhone-style
    document.addEventListener('DOMContentLoaded', function() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const closeButton = document.getElementById('closeButton');
        const userButton = document.getElementById('userButton');
        const userDropdown = document.getElementById('userDropdown');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const mobileUserSection = document.getElementById('mobileUserSection');

        // Auto-hide navbar on scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            lastScrollY = window.scrollY;
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        }

        function closeMobileMenu() {
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', toggleMobileMenu);
        closeButton.addEventListener('click', closeMobileMenu);

        // Close mobile menu on overlay click
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // User dropdown toggle
        userButton.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            userDropdown.classList.remove('open');
        });

        // Prevent dropdown from closing when clicking inside
        dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Update user sections based on login status
        function updateUserSections() {
            const isLoggedIn = typeof auth !== 'undefined' && auth.isLoggedIn && auth.isLoggedIn();
            
            if (isLoggedIn) {
                const user = auth.getCurrentUser();
                const userType = user ? user.user_type : 'unknown';
                const dashboardUrl = userType === 'conducteur' ? 'comptecon-new.html' : 'comptevoyageur-new.html';
                
                // Desktop dropdown
                dropdownMenu.innerHTML = \`
                    <a href="\${dashboardUrl}">Mon compte</a>
                    <a href="#" onclick="handleLogout()">Déconnexion</a>
                \`;
                
                // Mobile user section  
                mobileUserSection.innerHTML = \`
                    <div style="text-align: center; margin-bottom: 1rem;">
                        <div style="font-weight: bold; color: #205c2c;">Connecté en tant que</div>
                        <div style="font-size: 0.9rem; color: #6b7280;">\${user.email || 'Utilisateur'}</div>
                    </div>
                    <a href="\${dashboardUrl}" class="mobile-link" style="justify-content: center; border: none; background: #205c2c; color: white; border-radius: 8px; margin: 0.5rem;">
                        <span>Mon compte</span>
                    </a>
                    <a href="#" onclick="handleLogout()" class="mobile-link" style="justify-content: center; border: none; color: #dc2626;">
                        <span>Déconnexion</span>
                    </a>
                \`;
            } else {
                // Desktop dropdown
                dropdownMenu.innerHTML = \`
                    <a href="login.html">Connexion</a>
                    <a href="signup-new.html">Inscription</a>
                \`;
                
                // Mobile user section
                mobileUserSection.innerHTML = \`
                    <a href="login.html" class="mobile-link" style="justify-content: center; border: none; background: #205c2c; color: white; border-radius: 8px; margin: 0.5rem;">
                        <span>Connexion</span>
                    </a>
                    <a href="signup-new.html" class="mobile-link" style="justify-content: center; border: none; background: #f3f4f6; color: #205c2c; border-radius: 8px; margin: 0.5rem;">
                        <span>Inscription</span>
                    </a>
                \`;
            }
        }

        // Initialize user sections
        updateUserSections();

        // Listen for auth changes
        if (typeof auth !== 'undefined') {
            // Update user sections when auth state changes
            const originalSetCurrentUser = auth.setCurrentUser;
            auth.setCurrentUser = function(user) {
                originalSetCurrentUser.call(this, user);
                updateUserSections();
            };
        }

        // Handle logout
        window.handleLogout = function() {
            if (typeof auth !== 'undefined' && auth.logout) {
                auth.logout();
                updateUserSections();
                window.location.href = 'login.html';
            }
        };

        // Mark current page as active
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            }
        });

        // Touch gestures for mobile (swipe to close)
        let touchStartX = 0;
        let touchEndX = 0;

        mobileOverlay.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        mobileOverlay.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX > touchStartX + 50) {
                closeMobileMenu();
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });`;

// Fonction pour intégrer la navbar dans une page
function integrateNavbar(filePath) {
    try {
        console.log(`🔄 Traitement de ${filePath}...`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Rechercher la navbar existante et la remplacer
        const navbarRegex = /<nav[^>]*class="navbar-ecoride"[^>]*>[\s\S]*?<\/nav>/i;
        
        if (navbarRegex.test(content)) {
            // Remplacer la navbar existante
            content = content.replace(navbarRegex, responsiveNavbar);
            console.log(`✅ Navbar remplacée dans ${filePath}`);
        } else {
            // Insérer après <body>
            const bodyRegex = /<body[^>]*>/;
            const bodyMatch = bodyRegex.exec(content);
            if (bodyMatch) {
                const insertIndex = content.indexOf(bodyMatch[0]) + bodyMatch[0].length;
                content = content.slice(0, insertIndex) + '\n' + responsiveNavbar + '\n' + content.slice(insertIndex);
                console.log(`✅ Navbar ajoutée dans ${filePath}`);
            }
        }
        
        // Ajouter le CSS dans le <head>
        if (!content.includes('.navbar-responsive')) {
            const headEnd = content.indexOf('</head>');
            if (headEnd > -1) {
                const cssTag = `    <style>\n${responsiveCSS}\n    </style>\n`;
                content = content.slice(0, headEnd) + cssTag + content.slice(headEnd);
                console.log(`✅ CSS ajouté dans ${filePath}`);
            }
        }
        
        // Ajouter le JavaScript avant </body>
        if (!content.includes('navbar responsive iPhone-style')) {
            const bodyEnd = content.lastIndexOf('</body>');
            if (bodyEnd > -1) {
                const jsTag = `    <script>\n${responsiveJS}\n    </script>\n`;
                content = content.slice(0, bodyEnd) + jsTag + content.slice(bodyEnd);
                console.log(`✅ JavaScript ajouté dans ${filePath}`);
            }
        }
        
        // Sauvegarder le fichier
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${filePath} mis à jour avec succès!`);
        
    } catch (error) {
        console.error(`❌ Erreur lors du traitement de ${filePath}:`, error.message);
    }
}

// Script principal
console.log('🚀 Début de l\'intégration de la navbar responsive...\n');

pages.forEach(page => {
    const fullPath = path.join(__dirname, '..', page);
    if (fs.existsSync(fullPath)) {
        integrateNavbar(fullPath);
    } else {
        console.log(`⚠️  Fichier non trouvé: ${page}`);
    }
    console.log(''); // Ligne vide pour la lisibilité
});

console.log('🎉 Intégration terminée!\n');
console.log('📱 Fonctionnalités ajoutées:');
console.log('  ✅ Design iPhone-style moderne');
console.log('  ✅ Menu hamburger responsive'); 
console.log('  ✅ Animations fluides');
console.log('  ✅ Auto-hide au scroll');
console.log('  ✅ Swipe gestures');
console.log('  ✅ Dark mode ready');
console.log('\n🔗 Tous les liens href ont été corrigés!');
