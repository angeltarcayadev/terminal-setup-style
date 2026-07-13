# =====================================================================
# GENERADOR AUTOMÁTICO DE CAPTURAS DE PANTALLA OFICIALES (FREEZE)
# =====================================================================

$Themes = @(
    "oficial_premium", "cyberpunk", "dracula", "hacker", 
    "tokyonight_storm", "monokai", "blue-owl", "synthwave", 
    "gruvbox", "minimal", "catppuccin_mocha", "cobalt2",
    "night-owl", "nord", "agnoster", "material",
    "spaceship", "powerlevel10k_rainbow", "paradox"
)

$AssetsDir = ".\assets"
if (-not (Test-Path $AssetsDir)) {
    New-Item -ItemType Directory -Force -Path $AssetsDir | Out-Null
}

# Verificar si freeze está instalado
$FreezeCmd = "freeze"
if (-not (Get-Command freeze -ErrorAction SilentlyContinue)) {
    $FreezeCmd = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\charmbracelet.freeze_Microsoft.Winget.Source_8wekyb3d8bbwe\freeze_0.2.2_Windows_x86_64\freeze.exe"
    if (-not (Test-Path $FreezeCmd)) {
        Write-Host "Instalando Freeze automáticamente..." -ForegroundColor Yellow
        winget install charmbracelet.freeze -s winget --silent --accept-source-agreements --accept-package-agreements | Out-Null
        $FreezeCmd = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\charmbracelet.freeze_Microsoft.Winget.Source_8wekyb3d8bbwe\freeze_0.2.2_Windows_x86_64\freeze.exe"
    }
}

foreach ($t in $Themes) {
    Write-Host "[*] Generando captura para $t..." -ForegroundColor Cyan
    
    $ThemeUrl = "https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/$t.omp.json"
    $TempJson = "temp_theme.json"
    
    try {
        Invoke-WebRequest -Uri $ThemeUrl -OutFile $TempJson -UseBasicParsing -ErrorAction Stop
    } catch {
        Write-Host "[!] Tema $t no encontrado en GitHub oficial. Omitiendo..." -ForegroundColor Red
        continue
    }
    
    # Custom mappings para los nombres de los archivos PNG
    $OutName = $t
    if ($t -eq "oficial_premium") { $OutName = "oficial_premium" }
    if ($t -eq "tokyonight_storm") { $OutName = "tokyo" }
    if ($t -eq "catppuccin_mocha") { $OutName = "catppuccin" }
    if ($t -eq "powerlevel10k_rainbow") { $OutName = "powerlevel10k" }
    if ($t -eq "blue-owl") { $OutName = "ocean" }
    
    $OutFile = "$AssetsDir\$OutName.png"
    
    # Comando a ejecutar para la foto
    $Command = "oh-my-posh print primary --config $TempJson"
    
    Write-Host "Ejecutando freeze para $OutName..." -ForegroundColor DarkGray
    & $FreezeCmd --execute $Command -o $OutFile --window --border.radius 8 --padding 15,20,15,20 --margin 20,20,20,20 --theme dracula --font.family "FiraCode Nerd Font"
}

Remove-Item "temp_theme.json" -ErrorAction SilentlyContinue
Write-Host "[OK] Todas las capturas generadas exitosamente en la carpeta assets/" -ForegroundColor Green

