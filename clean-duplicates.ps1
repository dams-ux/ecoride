# Script PowerShell pour nettoyer les doublons de pages EcoRide

Write-Host "🧹 Nettoyage des doublons de pages EcoRide..." -ForegroundColor Green
Write-Host ""

# Définir les dossiers de travail
$ecoridePath = "c:\Users\damie\OneDrive\Bureau\projecteco\ecoride"
$ecorideNewPath = "c:\Users\damie\OneDrive\Bureau\projecteco\ecoride-new"
$pagesPath = Join-Path $ecoridePath "src\pages"

# Fichiers à supprimer (versions obsolètes)
$filesToDelete = @(
    # Pages obsolètes dans ecoride/src/pages
    "signup.html",
    "covoiturage.html", 
    "comptecon.html",
    "comptevoyageur.html",
    "acceuil.html",
    "navbar.html",
    "test-database.html",
    # Dossier entier ecoride-new (doublon)
    $ecorideNewPath
)

Write-Host "📋 Fichiers/dossiers à supprimer :" -ForegroundColor Yellow
foreach ($file in $filesToDelete) {
    if ($file -eq $ecorideNewPath) {
        Write-Host "  📁 $file (dossier entier)" -ForegroundColor Yellow
    } else {
        Write-Host "  📄 $file" -ForegroundColor Yellow
    }
}
Write-Host ""

# Confirmation utilisateur
$confirm = Read-Host "Voulez-vous continuer la suppression ? (o/n)"
if ($confirm -ne 'o' -and $confirm -ne 'O') {
    Write-Host "❌ Annulation de la suppression" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "🗑️ Suppression en cours..." -ForegroundColor Cyan

# Supprimer les fichiers dans src/pages
foreach ($file in $filesToDelete[0..6]) {  # Les 7 premiers éléments
    $fullPath = Join-Path $pagesPath $file
    if (Test-Path $fullPath) {
        Remove-Item $fullPath -Force
        Write-Host "  ✅ Supprimé: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Inexistant: $file" -ForegroundColor Gray
    }
}

# Supprimer le dossier ecoride-new entier
if (Test-Path $ecorideNewPath) {
    Remove-Item $ecorideNewPath -Recurse -Force
    Write-Host "  ✅ Supprimé: dossier ecoride-new (doublon)" -ForegroundColor Green
} else {
    Write-Host "  ⚠️ Inexistant: dossier ecoride-new" -ForegroundColor Gray
}

Write-Host ""
Write-Host "✅ Nettoyage terminé!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Structure finale conservée:" -ForegroundColor Cyan
Write-Host "  ecoride/" -ForegroundColor White
Write-Host "  ├── index.html" -ForegroundColor White
Write-Host "  └── src/" -ForegroundColor White
Write-Host "      ├── pages/" -ForegroundColor White
Write-Host "      │   ├── login.html" -ForegroundColor Green
Write-Host "      │   ├── signup-new.html" -ForegroundColor Green
Write-Host "      │   ├── covoiturage-new.html" -ForegroundColor Green
Write-Host "      │   ├── comptecon-new.html" -ForegroundColor Green
Write-Host "      │   ├── comptevoyageur-new.html" -ForegroundColor Green
Write-Host "      │   └── navbar-responsive.html" -ForegroundColor Green
Write-Host "      ├── scripts/" -ForegroundColor White
Write-Host "      └── styles/" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Seules les pages fonctionnelles sont conservées!" -ForegroundColor Green
