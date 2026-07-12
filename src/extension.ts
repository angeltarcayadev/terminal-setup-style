import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as https from 'https';

export function activate(context: vscode.ExtensionContext) {
    console.log('¡La extensión "Terminal Setup Style" está activa!');

    // 1. Registrar el comando de instalación de la terminal
    let installDisposable = vscode.commands.registerCommand('terminal-setup-style.install', async () => {
        try {
            const config = vscode.workspace.getConfiguration('terminalSetup');
            const nombre = config.get<string>('nombre') || 'Angel-T Dev';
            const fuente = config.get<string>('fuente') || 'FiraCode Nerd Font Mono';
            const tema = config.get<string>('tema') || 'angel-default';

            vscode.window.showInformationMessage('🚀 Iniciando instalación de la Terminal de Angel-T Dev...');

            // Aplicar automáticamente la fuente elegida en settings.json
            const terminalConfig = vscode.workspace.getConfiguration();
            await terminalConfig.update(
                'terminal.integrated.fontFamily', 
                `'${fuente}'`, 
                vscode.ConfigurationTarget.Global
            );

            // Crear y mostrar la terminal de instalación
            const terminal = vscode.window.createTerminal(`Instalador Angel-T Dev`);
            terminal.show();

            // Ejecutar el script remoto pasando las variables configuradas
            const scriptUrl = "https://raw.githubusercontent.com/angeltarcayadev/Terminal-Setup/main/install.ps1";
            const envVars = `$env:TERMINAL_NOMBRE='${nombre}'; $env:USER_NAME='${nombre}'; $env:TERMINAL_TEMA='${tema}'; $env:SELECTED_THEME='${tema}';`;
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
            const tema = config.get<string>('tema') || 'angel-default';

            // Si cambió la fuente, actualizar la configuración del terminal en VS Code
            if (event.affectsConfiguration('terminalSetup.fuente')) {
                const terminalConfig = vscode.workspace.getConfiguration();
                await terminalConfig.update(
                    'terminal.integrated.fontFamily', 
                    `'${fuente}'`, 
                    vscode.ConfigurationTarget.Global
                );
            }

            // Si cambió el tema o el nombre, actualizar el archivo JSON local del tema instantáneamente
            if (event.affectsConfiguration('terminalSetup.tema') || event.affectsConfiguration('terminalSetup.nombre')) {
                await updateLocalThemeFile(nombre, tema);
            }
        }
    });

    context.subscriptions.push(installDisposable);
    context.subscriptions.push(configListener);
}

export function deactivate() {}

// Función auxiliar para descargar los temas desde GitHub de forma segura y liviana
function fetchThemeJson(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`Error status code: ${res.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Función principal de actualización instantánea de configuración local
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

        // 1. Leer el archivo del tema (primero local para pruebas, luego GitHub como fallback)
        const localThemeDir = 'c:/Users/angel/Desktop/Terminal-Setup-1/Themes';
        const localThemePath = path.join(localThemeDir, `${tema}.omp.json`);
        
        let themeJson = '';
        if (fs.existsSync(localThemePath)) {
            themeJson = fs.readFileSync(localThemePath, 'utf8');
            console.log(`[TerminalSetup] Cargado tema local de: ${localThemePath}`);
        } else {
            const themeUrl = `https://raw.githubusercontent.com/angeltarcayadev/Terminal-Setup/main/Themes/${tema}.omp.json`;
            themeJson = await fetchThemeJson(themeUrl);
            console.log(`[TerminalSetup] Descargado tema de GitHub: ${themeUrl}`);
        }

        // 2. Personalizar el JSON del tema inyectando el nombre del usuario
        const updatedJson = themeJson.replace(/Angel-T Dev/g, nombre);

        // 3. Escribir en todos los perfiles de PowerShell existentes
        let updatedCount = 0;
        for (const p of paths) {
            if (fs.existsSync(p)) {
                const themeFile = path.join(p, 'theme.omp.json');
                fs.writeFileSync(themeFile, updatedJson, 'utf8');
                updatedCount++;
            }
        }

        if (updatedCount > 0) {
            vscode.window.showInformationMessage(`🎨 Tema de terminal actualizado a '${tema}' con nombre '${nombre}'. Abre una nueva terminal para ver los cambios.`);
        }
    } catch (err: any) {
        console.error('[TerminalSetup] Error actualizando el archivo local de tema:', err);
        vscode.window.showErrorMessage(`❌ Error al configurar el tema automáticamente: ${err.message || err}`);
    }
}