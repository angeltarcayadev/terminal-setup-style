param (
    [string]$Themes = ""
)

$FreezeCmd = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\charmbracelet.freeze_Microsoft.Winget.Source_8wekyb3d8bbwe\freeze_0.2.2_Windows_x86_64\freeze.exe"

if ($Themes -eq "") {
    Write-Host "Por favor especifica los temas separados por coma, ej: -Themes 'tema1,tema2'" -ForegroundColor Yellow
    exit
}

$ThemeList = $Themes -split ","

New-Item -ItemType Directory -Force -Path "assets\svg" | Out-Null

foreach ($t in $ThemeList) {
    $t = $t.Trim()
    Write-Host "Generando SVG para $t..." -ForegroundColor Cyan
    $ConfigPath = "themes\$t.omp.json"
    
    if (-not (Test-Path $ConfigPath)) {
        Write-Host "El tema $t no existe en themes/" -ForegroundColor Red
        continue
    }

    $OutFile = "assets\svg\$t.svg"
    $Command = "oh-my-posh print primary --config $ConfigPath"
    & $FreezeCmd --execute $Command -o $OutFile --window --border.radius 8 --padding 15,20,15,20 --margin 20,20,20,20 --theme dracula --font.family "FiraCode Nerd Font"
}

Write-Host "¡SVGs generados exitosamente en assets/svg/!" -ForegroundColor Green
