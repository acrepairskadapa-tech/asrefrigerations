# AS Refrigerations - 1-Click Automated Build & Deploy Script
Write-Host ">>> Building website bundle..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Aborting deployment." -ForegroundColor Red
    exit 1
}

Write-Host ">>> Pushing to production branch..." -ForegroundColor Cyan
Push-Location dist
git add -A
git commit -m "deploy: automated production release $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin production
Pop-Location

Write-Host ">>> DEPLOYMENT COMPLETE! Hostinger will auto-update https://asrefrigerations.com within seconds." -ForegroundColor Green
