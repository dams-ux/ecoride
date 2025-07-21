# Script de nettoyage des doublons - EcoRide
# Supprime les anciennes pages inutiles et garde seulement les versions -new

Write-Host "🧹 Nettoyage des doublons de pages..." -ForegroundColor Yellow
Write-Host ""

# Configuration des chemins
$projectRoot = "c:\Users\damie\OneDrive\Bureau\projecteco\ecoride"
$pagesDir = Join-Path $projectRoot "src\pages"

# Pages à supprimer (anciennes versions)
$pagesToDelete = @(
    "signup.html",
    "covoiturage.html", 
    "comptecon.html",
    "comptevoyageur.html",
    "navbar.html",
    "acceuil.html",
    "test-database.html"
)

Write-Host "📋 Pages à supprimer:" -ForegroundColor Cyan
foreach ($page in $pagesToDelete) {
    $fullPath = Join-Path $pagesDir $page
    if (Test-Path $fullPath) {
        Write-Host "  ❌ $page" -ForegroundColor Red
        Remove-Item $fullPath -Force
        Write-Host "    ✅ Supprimée" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  $page (déjà supprimée)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "📋 Pages conservées (versions finales):" -ForegroundColor Green
$finalPages = @(
    "login.html",
    "signup-new.html",
    "covoiturage-new.html", 
    "comptecon-new.html",
    "comptevoyageur-new.html",
    "navbar-responsive.html"
)

foreach ($page in $finalPages) {
    $fullPath = Join-Path $pagesDir $page
    if (Test-Path $fullPath) {
        Write-Host "  ✅ $page" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $page (MANQUANTE!)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎯 Résultat: Structure nettoyée!" -ForegroundColor Green
Write-Host "   - Anciennes pages supprimées"
Write-Host "   - Seules les versions finales sont conservées"
Write-Host ""
