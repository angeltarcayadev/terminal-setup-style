import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as https from 'https';
import * as figlet from 'figlet';
export function activate(context: vscode.ExtensionContext) {
    console.log('¡La extensión "Terminal Setup Style" está activa!');

    // 0. Auto-ejecutar el menú la primera vez que se instala
    const isFirstRun = !context.globalState.get('terminalSetupStyle_hasRun');
    if (isFirstRun) {
        context.globalState.update('terminalSetupStyle_hasRun', true);
        // Retrasamos un segundo para asegurarnos de que la interfaz de VS Code esté lista
        setTimeout(() => {
            vscode.commands.executeCommand('terminal-setup-style.install');
        }, 1500);
    }

    // 1. Registrar el comando de instalación de la terminal
    let installDisposable = vscode.commands.registerCommand('terminal-setup-style.install', async () => {
        try {
            const config = vscode.workspace.getConfiguration('terminalSetup');
            const nombre = config.get<string>('nombre') || 'Angel-T Dev';
            const fuente = config.get<string>('fuente') || 'FiraCode Nerd Font Mono';
            let tema = config.get<string>('tema') || 'jandedobbeleer';

            // 1.1 Mostrar un menú (QuickPick) leyendo los archivos de la carpeta 'themes' localmente
            let temasDisponibles: string[] = [];
            try {
                const themesDir = path.join(__dirname, '..', 'themes');
                const files = fs.readdirSync(themesDir);
                temasDisponibles = files.filter(f => f.endsWith('.omp.json')).map(f => f.replace('.omp.json', ''));
            } catch (err) {
                console.error("No se pudo leer la carpeta themes", err);
                // Fallback de seguridad
                temasDisponibles = ['jandedobbeleer', 'cyberpunk', 'dracula'];
            }

            const seleccion = await vscode.window.showQuickPick(temasDisponibles, {
                placeHolder: '🎨 Selecciona tu tema favorito para instalar (o presiona Esc para cancelar)',
                title: 'Menú de Temas - Angel-T Dev'
            });

            // Si el usuario cancela (presiona Esc), salimos del comando
            if (!seleccion) {
                return;
            }

            // Si seleccionó uno, actualizamos la variable tema y la configuración guardada
            tema = seleccion;
            await config.update('tema', tema, vscode.ConfigurationTarget.Global);

            vscode.window.showInformationMessage(`🚀 Iniciando instalación del tema ${tema}...`);

            // Aplicar automáticamente la fuente elegida en settings.json
            const terminalConfig = vscode.workspace.getConfiguration();
            await terminalConfig.update(
                'terminal.integrated.fontFamily', 
                `'${fuente}'`, 
                vscode.ConfigurationTarget.Global
            );

            // Obtener el color ASCII configurado
            const colorAscii = config.get<string>('colorAscii') || 'auto';

            // Crear y mostrar la terminal de instalación
            const terminal = vscode.window.createTerminal(`Instalador Angel-T Dev`);
            terminal.show();

            // Ejecutar el script remoto pasando las variables configuradas
            const scriptUrl = "https://raw.githubusercontent.com/angeltarcayadev/Terminal-Setup/main/install.ps1";
            const envVars = `$env:TERMINAL_NOMBRE='${nombre}'; $env:USER_NAME='${nombre}'; $env:TERMINAL_TEMA='${tema}'; $env:SELECTED_THEME='${tema}'; $env:TERMINAL_COLOR_ASCII='${colorAscii}';`;
            const command = `${envVars} Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force; irm "${scriptUrl}" | iex`;
            
            terminal.sendText(command);

            vscode.window.showInformationMessage('✅ ¡Fuente configurada! Espera a que la terminal termine de instalar todo.');

        } catch (error) {
            vscode.window.showErrorMessage('❌ Hubo un error al intentar configurar la terminal.');
            console.error(error);
        }
    });

    // 2. Registrar el listener de cambios de configuración
    let configListener = vscode.workspace.onDidChangeConfiguration(async (event) => {
        if (event.affectsConfiguration('terminalSetup')) {
            const config = vscode.workspace.getConfiguration('terminalSetup');
            const nombre = config.get<string>('nombre') || 'Angel-T Dev';
            const fuente = config.get<string>('fuente') || 'FiraCode Nerd Font Mono';
            const tema = config.get<string>('tema') || 'jandedobbeleer';
            const asciiName = config.get<string>('asciiName') || 'Angel-T Dev';
            const colorAscii = config.get<string>('colorAscii') || 'auto';

            // Si cambió la fuente, actualizar la configuración del terminal en VS Code
            if (event.affectsConfiguration('terminalSetup.fuente')) {
                const terminalConfig = vscode.workspace.getConfiguration();
                await terminalConfig.update(
                    'terminal.integrated.fontFamily', 
                    `'${fuente}'`, 
                    vscode.ConfigurationTarget.Global
                );
            }

            // Si cambió el tema, el nombre, el nombre ASCII o su color, actualizar todo localmente
            if (
                event.affectsConfiguration('terminalSetup.tema') || 
                event.affectsConfiguration('terminalSetup.nombre') ||
                event.affectsConfiguration('terminalSetup.asciiName') ||
                event.affectsConfiguration('terminalSetup.colorAscii')
            ) {
                await updateLocalThemeFile(nombre, tema);
                await updateLocalProfile(asciiName, colorAscii, tema);
            }
        }
    });

    context.subscriptions.push(installDisposable);
    context.subscriptions.push(configListener);
}

export function deactivate() {}

// Función principal de actualización instantánea de configuración local (Descarga desde Oh My Posh)
async function updateLocalThemeFile(nombre: string, tema: string) {
    try {
        const homeDir = os.homedir();
        
        // Directorios potenciales de perfiles de PowerShell en Windows
        const paths = [
            path.join(homeDir, 'Documents', 'PowerShell'),
            path.join(homeDir, 'Documents', 'WindowsPowerShell'),
            path.join(homeDir, 'OneDrive', 'Documents', 'PowerShell'),
            path.join(homeDir, 'OneDrive', 'Documents', 'WindowsPowerShell')
        ];

        // Leer el tema directamente de la carpeta 'themes' de la extensión
        const themePath = path.join(__dirname, '..', 'themes', `${tema}.omp.json`);
        
        if (!fs.existsSync(themePath)) {
            throw new Error(`El archivo de tema ${tema}.omp.json no se encuentra en la carpeta themes local.`);
        }

        const themeJsonTemplate = fs.readFileSync(themePath, 'utf8');

        // 3. Escribir en todos los perfiles de PowerShell existentes
        let updatedCount = 0;
        for (const p of paths) {
            if (fs.existsSync(p)) {
                // Usando custom-theme.omp.json para coincidir con el nuevo install.ps1
                const themeFile = path.join(p, 'custom-theme.omp.json');
                fs.writeFileSync(themeFile, themeJsonTemplate, 'utf8');
                updatedCount++;
            }
        }

        if (updatedCount > 0) {
            vscode.window.showInformationMessage(`🎨 Tema de terminal actualizado a '${tema}' oficial de Oh My Posh. Abre una nueva terminal para ver los cambios.`);
        }
    } catch (err: any) {
        console.error('[TerminalSetup] Error actualizando el archivo local de tema:', err);
        vscode.window.showErrorMessage(`❌ Error al configurar el tema automáticamente: ${err.message || err}`);
    }
}

// Función para actualizar el perfil de PowerShell y el arte ASCII
async function updateLocalProfile(asciiName: string, asciiColor: string, tema: string) {
    try {
        const homeDir = os.homedir();
        
        const profilePaths = [
            path.join(homeDir, 'Documents', 'PowerShell', 'Microsoft.PowerShell_profile.ps1'),
            path.join(homeDir, 'Documents', 'WindowsPowerShell', 'Microsoft.PowerShell_profile.ps1'),
            path.join(homeDir, 'OneDrive', 'Documents', 'PowerShell', 'Microsoft.PowerShell_profile.ps1'),
            path.join(homeDir, 'OneDrive', 'Documents', 'WindowsPowerShell', 'Microsoft.PowerShell_profile.ps1')
        ];

        let finalColor = asciiColor;
        if (asciiColor === 'auto') {
            switch (tema) {
                case "cyberpunk": finalColor = "Cyan"; break;
                case "dracula": finalColor = "Magenta"; break;
                case "hacker": finalColor = "Green"; break;
                case "tokyonight_storm": finalColor = "Blue"; break;
                case "monokai": finalColor = "Yellow"; break;
                case "blue-owl": finalColor = "Cyan"; break;
                case "synthwave": finalColor = "Magenta"; break;
                case "gruvbox": finalColor = "Yellow"; break;
                case "minimal": finalColor = "White"; break;
                case "catppuccin_mocha": finalColor = "Magenta"; break;
                case "cobalt2": finalColor = "Yellow"; break;
                case "night-owl": finalColor = "Blue"; break;
                case "nord": finalColor = "Cyan"; break;
                case "agnoster": finalColor = "Blue"; break;
                case "material": finalColor = "Cyan"; break;
                case "spaceship": finalColor = "Magenta"; break;
                case "powerlevel10k_rainbow": finalColor = "Yellow"; break;
                case "paradox": finalColor = "Green"; break;
                default: finalColor = "Red"; break;
            }
        }

        let asciiArt = "";
        if (asciiName && asciiName.trim() !== "") {
            try {
                // figlet genera el arte ASCII. Usamos la fuente ANSI Shadow que era la original.
                asciiArt = figlet.textSync(asciiName, { font: 'ANSI Shadow' });
            } catch (e) {
                console.error("Error generando figlet", e);
                // Si falla por falta de fuentes, usa un texto normal como fallback
                asciiArt = asciiName;
            }
        }

        // Preparar el string escapando comillas para PowerShell
        const arteSafe = asciiArt.replace(/"/g, '`"');

        const profileCode = `Invoke-Expression (@(& 'oh-my-posh' init pwsh --config '~\\Documents\\PowerShell\\custom-theme.omp.json') -join "\\n")
Import-Module Terminal-Icons

$global:OmpPrompt = $function:prompt
$global:FirstTerminalRun = $true

function prompt {
    if ($global:FirstTerminalRun) {
        Clear-Host
        Write-Host " "
        Write-Host "${arteSafe}" -ForegroundColor ${finalColor}
        Write-Host " "
        $global:FirstTerminalRun = $false
    }
    & $global:OmpPrompt
}
`;

        // Escribir en todos los perfiles de PowerShell existentes
        for (const p of profilePaths) {
            if (fs.existsSync(p)) {
                fs.writeFileSync(p, profileCode, 'utf8');
            }
        }
    } catch (err: any) {
        console.error('[TerminalSetup] Error actualizando el perfil ASCII:', err);
    }
}