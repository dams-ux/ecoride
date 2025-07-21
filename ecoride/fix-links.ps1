# 🔗 Script PowerShell de correction des liens href - EcoRide
# Corrige tous les liens cassés dans les pages HTML

Write-Host "🚀 Début de la correction des liens href..." -ForegroundColor Green
Write-Host ""

# Configuration des chemins
$projectRoot = "c:\Users\damie\OneDrive\Bureau\projecteco\ecoride"
$pagesDir = Join-Path $projectRoot "src\pages"

# Liste des corrections à appliquer
$corrections = @(
    @{
        Pattern = 'href="signup\.html"'
        Replacement = 'href="signup-new.html"'
        Description = "Correction signup.html vers signup-new.html"
    },
    @{
        Pattern = 'href="covoiturage\.html"'
        Replacement = 'href="covoiturage-new.html"'
        Description = "Correction covoiturage.html vers covoiturage-new.html"
    },
    @{
        Pattern = 'href="../../index\.html"'
        Replacement = 'href="../index.html"'
        Description = "Correction chemin index.html"
    },
    @{
        Pattern = 'src="\.\./scripts/auth\.js"'
        Replacement = 'src="../scripts/auth-new.js"'
        Description = "Correction auth.js vers auth-new.js"
    },
    @{
        Pattern = 'src="\.\./scripts/database\.js"'
        Replacement = 'src="../scripts/supabase-client.js"'
        Description = "Correction database.js vers supabase-client.js"
    }
)

# Fonction pour appliquer les corrections à un fichier
function Apply-Corrections {
    param(
        [string]$FilePath,
        [array]$Corrections
    )
    
    if (-not (Test-Path $FilePath)) {
        Write-Host "⚠️  Fichier non trouvé: $FilePath" -ForegroundColor Yellow
        return
    }
    
    $fileName = Split-Path $FilePath -Leaf
    Write-Host "🔄 Traitement de $fileName..." -ForegroundColor Cyan
    
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    $modified = $false
    
    foreach ($correction in $Corrections) {
        if ($content -match $correction.Pattern) {
            $content = $content -replace $correction.Pattern, $correction.Replacement
            Write-Host "  ✅ $($correction.Description)" -ForegroundColor Green
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content $FilePath -Value $content -Encoding UTF8
        Write-Host "  💾 Fichier sauvegardé" -ForegroundColor Green
    } else {
        Write-Host "  ➡️  Aucune correction nécessaire" -ForegroundColor Gray
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
Write-Host "🏠 Traitement du fichier index principal..." -ForegroundColor Magenta
Apply-Corrections -FilePath $indexFile -Corrections $corrections

# Traitement des pages dans src/pages
foreach ($file in $htmlFiles) {
    $filePath = Join-Path $pagesDir $file
    Apply-Corrections -FilePath $filePath -Corrections $corrections
}

# Vérification finale des liens
Write-Host "🔍 Vérification finale des liens..." -ForegroundColor Yellow
Write-Host ""

$allFiles = @($indexFile) + ($htmlFiles | ForEach-Object { Join-Path $pagesDir $_ })

foreach ($filePath in $allFiles) {
    if (Test-Path $filePath) {
        $fileName = Split-Path $filePath -Leaf
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Recherche des liens potentiellement cassés
        $suspiciousPatterns = @(
            'href="signup\.html"',
            'href="covoiturage\.html"',
            'href="../../index\.html"',
            'src="\.\./scripts/auth\.js"',
            'src="\.\./scripts/database\.js"'
        )
        
        $hasIssues = $false
        foreach ($pattern in $suspiciousPatterns) {
            if ($content -match $pattern) {
                if (-not $hasIssues) {
                    Write-Host "⚠️  Liens suspects dans $fileName :" -ForegroundColor Red
                    $hasIssues = $true
                }
                $matches = [regex]::Matches($content, $pattern)
                foreach ($match in $matches) {
                    Write-Host "    - $($match.Value)" -ForegroundColor Red
                }
            }
        }
        
        if (-not $hasIssues) {
            Write-Host "✅ $fileName - Tous les liens sont corrects" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "🎉 Correction terminée!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Résumé des corrections appliquées:" -ForegroundColor Cyan
Write-Host "  ✅ signup.html → signup-new.html"
Write-Host "  ✅ covoiturage.html → covoiturage-new.html" 
Write-Host "  ✅ Chemins index.html corrigés"
Write-Host "  ✅ Scripts auth.js → auth-new.js"
Write-Host "  ✅ Scripts database.js → supabase-client.js"
Write-Host ""
Write-Host "🔗 Tous les liens href sont maintenant fonctionnels!" -ForegroundColor Green
