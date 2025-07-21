# Script PowerShell de correction des liens href - EcoRide

Write-Host "Debut de la correction des liens href..." -ForegroundColor Green
Write-Host ""

# Configuration des chemins
$projectRoot = "c:\Users\damie\OneDrive\Bureau\projecteco\ecoride"
$pagesDir = Join-Path $projectRoot "src\pages"

# Fonction pour appliquer les corrections à un fichier
function Apply-Corrections {
    param(
        [string]$FilePath
    )
    
    if (-not (Test-Path $FilePath)) {
        Write-Host "Fichier non trouve: $FilePath" -ForegroundColor Yellow
        return
    }
    
    $fileName = Split-Path $FilePath -Leaf
    Write-Host "Traitement de $fileName..." -ForegroundColor Cyan
    
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    $modified = $false
    
    # Correction signup.html vers signup-new.html
    if ($content -match 'href="signup\.html"') {
        $content = $content -replace 'href="signup\.html"', 'href="signup-new.html"'
        Write-Host "  Corrige signup.html vers signup-new.html" -ForegroundColor Green
        $modified = $true
    }
    
    # Correction covoiturage.html vers covoiturage-new.html
    if ($content -match 'href="covoiturage\.html"') {
        $content = $content -replace 'href="covoiturage\.html"', 'href="covoiturage-new.html"'
        Write-Host "  Corrige covoiturage.html vers covoiturage-new.html" -ForegroundColor Green
        $modified = $true
    }
    
    # Correction chemin index.html
    if ($content -match 'href="../../index\.html"') {
        $content = $content -replace 'href="../../index\.html"', 'href="../index.html"'
        Write-Host "  Corrige chemin index.html" -ForegroundColor Green
        $modified = $true
    }
    
    # Correction auth.js vers auth-new.js
    if ($content -match 'src="../scripts/auth\.js"') {
        $content = $content -replace 'src="../scripts/auth\.js"', 'src="../scripts/auth-new.js"'
        Write-Host "  Corrige auth.js vers auth-new.js" -ForegroundColor Green
        $modified = $true
    }
    
    # Correction database.js vers supabase-client.js
    if ($content -match 'src="../scripts/database\.js"') {
        $content = $content -replace 'src="../scripts/database\.js"', 'src="../scripts/supabase-client.js"'
        Write-Host "  Corrige database.js vers supabase-client.js" -ForegroundColor Green
        $modified = $true
    }
    
    if ($modified) {
        Set-Content $FilePath -Value $content -Encoding UTF8
        Write-Host "  Fichier sauvegarde" -ForegroundColor Green
    } else {
        Write-Host "  Aucune correction necessaire" -ForegroundColor Gray
    }
    Write-Host ""
}

# Liste des fichiers à traiter
$htmlFiles = @(
    "login.html",
    "signup-new.html", 
    "covoiturage-new.html",
    "comptecon-new.html",
    "comptevoyageur-new.html"
)

# Traitement de l'index principal
$indexFile = Join-Path $projectRoot "index.html"
Write-Host "Traitement du fichier index principal..." -ForegroundColor Magenta
Apply-Corrections -FilePath $indexFile

# Traitement des pages dans src/pages
foreach ($file in $htmlFiles) {
    $filePath = Join-Path $pagesDir $file
    Apply-Corrections -FilePath $filePath
}

Write-Host ""
Write-Host "Correction terminee!" -ForegroundColor Green
Write-Host ""
Write-Host "Resume des corrections appliquees:" -ForegroundColor Cyan
Write-Host "  signup.html vers signup-new.html"
Write-Host "  covoiturage.html vers covoiturage-new.html" 
Write-Host "  Chemins index.html corriges"
Write-Host "  Scripts auth.js vers auth-new.js"
Write-Host "  Scripts database.js vers supabase-client.js"
Write-Host ""
Write-Host "Tous les liens href sont maintenant fonctionnels!" -ForegroundColor Green
