# Ejecutar dentro de la carpeta del proyecto desde PowerShell.
# Solo se usa una vez, antes de la primera subida.

$Repo = "https://github.com/Danielito322/PROYECTO_FINAL.git"

git init
git branch -M main
git add .
git commit -m "feat: agrega estructura modular de NUBA"

git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    git remote set-url origin $Repo
} else {
    git remote add origin $Repo
}

Write-Host "Repositorio configurado. Ahora ejecuta: git push -u origin main" -ForegroundColor Green
