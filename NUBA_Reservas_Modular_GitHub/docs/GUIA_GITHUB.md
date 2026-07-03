# Guía rápida para subir a GitHub

Repositorio del equipo:

```text
https://github.com/Danielito322/PROYECTO_FINAL.git
```

## Primera subida

Abre PowerShell dentro de la carpeta del proyecto y ejecuta uno por uno:

```powershell
git init
git branch -M main
git add .
git commit -m "feat: agrega estructura modular de NUBA"
git remote add origin https://github.com/Danielito322/PROYECTO_FINAL.git
git push -u origin main
```

Si aparece `remote origin already exists`:

```powershell
git remote set-url origin https://github.com/Danielito322/PROYECTO_FINAL.git
git push -u origin main
```

Si GitHub indica que ya existen archivos en remoto:

```powershell
git pull origin main --allow-unrelated-histories --no-rebase
git push -u origin main
```

## Trabajar por ramas

Cada integrante crea su rama antes de modificar sus módulos:

```powershell
git checkout main
git pull origin main
git checkout -b feature/nombre-modulo
```

Ejemplos:

```powershell
git checkout -b feature/explorar
git checkout -b feature/reservas
git checkout -b feature/tienda-perfil
```

Al terminar un avance:

```powershell
git add .
git commit -m "feat: agrega módulo de reservas"
git push -u origin feature/reservas
```

Luego se unen cambios desde GitHub mediante **Pull Request** hacia `main`.

> Nunca trabajen los tres directamente en `main` y eviten editar a la vez los archivos compartidos.
