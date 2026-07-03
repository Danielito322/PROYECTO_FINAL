param(
  [string]$Mensaje = "feat: actualiza proyecto"
)

git add .
git commit -m $Mensaje
git push
