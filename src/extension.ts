import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('¡La extensión "Terminal Setup Style" está activa!');

    // Registramos el comando que declaramos en el package.json
    let disposable = vscode.commands.registerCommand('terminal-setup-style.install', async () => {
        try {
            // 1. Mostrar notificación de inicio
            vscode.window.showInformationMessage('🚀 Iniciando instalación de la Terminal de Angel-T Dev...');

            // 2. Inyectar la Nerd Font en la configuración global de VS Code
            const config = vscode.workspace.getConfiguration();
            await config.update(
                'terminal.integrated.fontFamily', 
                "'CaskaydiaCove Nerd Font'", 
                vscode.ConfigurationTarget.Global
            );

            // 3. Abrir una nueva terminal controlada por la extensión
            const terminal = vscode.window.createTerminal(`Instalador Angel-T Dev`);
            terminal.show();

            // 4. Enviar tu comando de GitHub directamente a la terminal
            const scriptUrl = "https://raw.githubusercontent.com/angeltarcayadev/Terminal-Setup/main/install.ps1";
            terminal.sendText(`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force; irm "${scriptUrl}" | iex`);

            // 5. Mostrar notificación de éxito
            vscode.window.showInformationMessage('✅ ¡Fuente configurada! Espera a que la terminal termine de instalar todo.');

        } catch (error) {
            vscode.window.showErrorMessage('❌ Hubo un error al intentar configurar la terminal.');
            console.error(error);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}