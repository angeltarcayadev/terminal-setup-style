import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as https from 'https';

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
            let tema = config.get<string>('tema') || 'angel-default';

            // 1.1 Mostrar un menú (QuickPick) para que el usuario elija su tema favorito
            const temasDisponibles = [
                'angel-default', 'angel-cyberpunk', 'angel-dracula', 'angel-hacker', 
                'angel-tokyo', 'angel-monokai', 'angel-ocean', 'angel-synthwave', 
                'angel-gruvbox', 'angel-minimal'
            ];

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

// Función principal de actualización instantánea de configuración local (Generación Dinámica)
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

        let colorPrincipal = "#FF2A2A";
        let colorSecundario = "#990000";

        switch (tema) {
            case "angel-cyberpunk": colorPrincipal = "#00FF9C"; colorSecundario = "#008F56"; break;
            case "angel-dracula": colorPrincipal = "#FF79C6"; colorSecundario = "#BD93F9"; break;
            case "angel-hacker": colorPrincipal = "#00FF00"; colorSecundario = "#008000"; break;
            case "angel-tokyo": colorPrincipal = "#7AA2F7"; colorSecundario = "#9ECE6A"; break;
            case "angel-monokai": colorPrincipal = "#FD971F"; colorSecundario = "#F92672"; break;
            case "angel-ocean": colorPrincipal = "#00A8CC"; colorSecundario = "#142850"; break;
            case "angel-synthwave": colorPrincipal = "#FF007F"; colorSecundario = "#3A0CA3"; break;
            case "angel-gruvbox": colorPrincipal = "#FE8019"; colorSecundario = "#D3869B"; break;
            case "angel-minimal": colorPrincipal = "#D4D4D4"; colorSecundario = "#808080"; break;
            default: colorPrincipal = "#FF2A2A"; colorSecundario = "#990000"; break;
        }

        const themeJsonTemplate = `{
  "$schema": "https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/schema.json",
  "blocks": [
    {
      "alignment": "left",
      "segments": [
        {
          "background": "${colorPrincipal}",
          "foreground": "#FFFFFF",
          "leading_diamond": "\\ue0b6",
          "style": "diamond",
          "template": " \\uf415 ${nombre} ",
          "trailing_diamond": "\\ue0c6",
          "type": "session"
        },
        {
          "background": "${colorSecundario}",
          "foreground": "#FFFFFF",
          "leading_diamond": "\\ue0c7",
          "options": { "style": "folder" },
          "style": "diamond",
          "template": " \\uf07b {{ .Path }} ",
          "trailing_diamond": "\\ue0c6",
          "type": "path"
        },
        {
          "background": "#424242",
          "foreground": "${colorPrincipal}",
          "leading_diamond": "\\ue0c7",
          "options": { "branch_icon": "" },
          "style": "diamond",
          "template": " \\uf126 {{ .HEAD }} ",
          "trailing_diamond": "\\ue0c6",
          "type": "git"
        },
        {
          "background": "#2E2E2E",
          "foreground": "#E4F34A",
          "leading_diamond": "\\ue0c7",
          "options": { "fetch_version": false },
          "style": "diamond",
          "template": " \\ue235 {{ if .Error }}{{ .Error }}{{ else }}{{ if .Venv }}{{ .Venv }} {{ end }}{{ .Full }}{{ end }} ",
          "trailing_diamond": "\\ue0c6",
          "type": "python"
        },
        {
          "background": "#2E2E2E",
          "foreground": "#42E66C",
          "leading_diamond": "\\ue0c7",
          "options": { "fetch_version": false },
          "style": "diamond",
          "template": " \\ue718 {{ if .PackageManagerIcon }}{{ .PackageManagerIcon }} {{ end }}{{ .Full }} ",
          "trailing_diamond": "\\ue0c6",
          "type": "node"
        },
        {
          "background": "#1A1A1A",
          "foreground": "#FFFFFF",
          "leading_diamond": "\\ue0c7",
          "options": { "time_format": "15:04" },
          "style": "diamond",
          "template": " \\uf017 {{ .CurrentDate | date .Format }} ",
          "trailing_diamond": "\\ue0b4",
          "type": "time"
        }
      ],
      "type": "prompt"
    }
  ],
  "final_space": true,
  "version": 4
}`;

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
            vscode.window.showInformationMessage(`🎨 Tema de terminal actualizado a '${tema}' con nombre '${nombre}'. Abre una nueva terminal para ver los cambios.`);
        }
    } catch (err: any) {
        console.error('[TerminalSetup] Error actualizando el archivo local de tema:', err);
        vscode.window.showErrorMessage(`❌ Error al configurar el tema automáticamente: ${err.message || err}`);
    }
}