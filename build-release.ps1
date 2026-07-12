param (
    [Parameter(Mandatory=$false)]
    [ValidateSet("patch", "minor", "major", "none", "ask")]
    [string]$bump = "ask"
)

# =====================================================================
# SCRIPT DE LANZAMIENTO - AUTOMATIZACIÓN DE VS-CODE EXTENSION BUILD
# =====================================================================

# 1. Leer el archivo package.json para obtener versión y nombre actual
Write-Host "[INFO] Leyendo metadatos de package.json..." -ForegroundColor Cyan
if (-not (Test-Path "package.json")) {
    Write-Error "[ERROR] No se encontró package.json en el directorio raíz."
    exit 1
}

$package = Get-Content -Raw -Path "package.json" | ConvertFrom-Json
$name = $package.name
$currentVersion = $package.version

Write-Host "[INFO] Extensión: $name" -ForegroundColor White
Write-Host "[INFO] Versión actual: $currentVersion" -ForegroundColor White

$choice = $bump

if ($choice -eq "ask") {
    Write-Host ""
    Write-Host "¿Cómo deseas incrementar la versión para este lanzamiento?" -ForegroundColor Cyan
    Write-Host "1) Patch (e.g., $currentVersion -> incremental de corrección) [Predeterminado]" -ForegroundColor Gray
    Write-Host "2) Minor (e.g., $currentVersion -> nueva característica)" -ForegroundColor Gray
    Write-Host "3) Major (e.g., $currentVersion -> versión mayor)" -ForegroundColor Gray
    Write-Host "4) No incrementar (Mantener la versión actual)" -ForegroundColor Gray

    $inputChoice = Read-Host "Elige una opción (1-4 o presiona Enter para Patch)"
    if (-not $inputChoice) { $inputChoice = "1" }

    switch ($inputChoice) {
        "1" { $choice = "patch" }
        "2" { $choice = "minor" }
        "3" { $choice = "major" }
        "4" { $choice = "none" }
        Default { $choice = "none" }
    }
}

switch ($choice) {
    "patch" {
        npm version patch --no-git-tag-version | Out-Null
        Write-Host "[OK] Versión incrementada a Patch en package.json." -ForegroundColor Green
    }
    "minor" {
        npm version minor --no-git-tag-version | Out-Null
        Write-Host "[OK] Versión incrementada a Minor en package.json." -ForegroundColor Green
    }
    "major" {
        npm version major --no-git-tag-version | Out-Null
        Write-Host "[OK] Versión incrementada a Major en package.json." -ForegroundColor Green
    }
    "none" {
        Write-Host "[INFO] Manteniendo la versión actual." -ForegroundColor Yellow
    }
}

# Volver a leer package.json con la nueva versión
$package = Get-Content -Raw -Path "package.json" | ConvertFrom-Json
$version = $package.version
$newVsixName = "$name-$version.vsix"

# Asegurar que los directorios de lanzamiento existan
$currentDir = "releases/current"
$previousDir = "releases/previous"

if (-not (Test-Path $currentDir)) { New-Item -ItemType Directory -Path $currentDir -Force | Out-Null }
if (-not (Test-Path $previousDir)) { New-Item -ItemType Directory -Path $previousDir -Force | Out-Null }

# 2. Mover archivos VSIX antiguos de 'current' a 'previous'
$existingVsix = Get-ChildItem -Path $currentDir -Filter "*.vsix"
if ($existingVsix) {
    foreach ($file in $existingVsix) {
        Write-Host "[INFO] Moviendo versión antigua '$($file.Name)' a '$previousDir'..." -ForegroundColor Yellow
        Move-Item -Path $file.FullName -Destination $previousDir -Force
    }
}

# 3. Compilar TypeScript
Write-Host "[INFO] Compilando código fuente..." -ForegroundColor Cyan
npm run compile
if ($LASTEXITCODE -ne 0) {
    Write-Error "[ERROR] La compilación falló. Corrige los errores antes de empaquetar."
    exit 1
}

# 4. Empaquetar la versión actual en la carpeta releases/current
Write-Host "[INFO] Creando el paquete VSIX para la versión $version..." -ForegroundColor Cyan
$vsixPath = Join-Path $currentDir $newVsixName

npx @vscode/vsce package --out $vsixPath --no-dependencies

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[OK] ¡Lanzamiento empaquetado con éxito!" -ForegroundColor Green
    Write-Host "[INFO] Archivo generado: $vsixPath" -ForegroundColor Green
    Write-Host "[INFO] Puedes compartir este archivo VSIX o instalarlo en tu VS Code." -ForegroundColor Cyan
} else {
    Write-Error "[ERROR] Hubo un error al empaquetar la extensión."
}
