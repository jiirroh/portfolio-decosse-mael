Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Installation Automatique d'Ollama + IA  " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Ollama est installé
if (Get-Command ollama -ErrorAction SilentlyContinue) {
    Write-Host "[+] Ollama est déjà installé sur ce PC !" -ForegroundColor Green
} else {
    Write-Host "[-] Ollama n'est pas détecté. Tentative d'installation via Winget..." -ForegroundColor Yellow
    winget install --id Ollama.Ollama -e --accept-source-agreements --accept-package-agreements
    
    # Recharger les variables d'environnement dans le script courant
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    if (Get-Command ollama -ErrorAction SilentlyContinue) {
        Write-Host "[+] Installation d'Ollama réussie !" -ForegroundColor Green
    } else {
        Write-Host "[!] Impossible de valider l'installation d'Ollama. Veuillez redémarrer votre PC ou l'installer manuellement via ollama.com." -ForegroundColor Red
        Write-Host "Appuyez sur une touche pour quitter..."
        $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
        exit
    }
}

Write-Host ""
Write-Host "[*] Téléchargement du modèle IA Llama 3 (Attention: ~4.7 Go, cela peut prendre un moment)..." -ForegroundColor Cyan
Write-Host "Le téléchargement va s'afficher ci-dessous :"
ollama pull llama3

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "✅ Terminé ! L'IA est prête à écouter les requêtes n8n." -ForegroundColor Green
Write-Host "L'API locale tourne en fond sur http://localhost:11434" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur une touche pour fermer cette fenêtre."
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
