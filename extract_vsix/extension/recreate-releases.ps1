$releases = @(
    @{ tag = "v0.0.1"; commit = "20e302d"; title = "Lanzamiento Inicial v0.0.1"; notes = "🚀 Lanzamiento inicial del repositorio.`n🔌 Conexión directa con el script instalador remoto de PowerShell pasando variables de entorno." }
    @{ tag = "v0.0.2"; commit = "9b0918f"; title = "Lanzamiento v0.0.2"; notes = "🖼️ **Mejoras Visuales e Integración**: Adición del logo oficial (``icon.png``) y optimización del empaquetado.`n🔧 Añadidas las configuraciones personalizadas al panel de VS Code.`n📜 Creación del script ``build-release.ps1`` para automatización de compilación." }
    @{ tag = "v0.0.5"; commit = "e575ef6"; title = "Lanzamiento v0.0.5"; notes = "⚙️ **Comando de Instalación Integrado**: Lógica principal para la sincronización de temas y la ejecución remota de instalación desde la terminal." }
    @{ tag = "v0.0.7"; commit = "f48120f"; title = "Lanzamiento v0.0.7"; notes = "✨ **Menú Interactivo (QuickPick)**: Se agregó un menú desplegable para elegir el tema directamente al ejecutar el comando.`n🎨 **Generación Dinámica de Temas**: Ahora los archivos ``.omp.json`` se generan dinámicamente con los colores seleccionados sin depender de descargas externas.`n📥 **Descarga Automática de Fuentes**: Instalación de *FiraCode Nerd Font* y *CaskaydiaCove Nerd Font* automáticamente sin pedir permisos de administrador." }
    @{ tag = "v0.0.9"; commit = "bd70d18"; title = "Lanzamiento v0.0.9"; notes = "🔄 **Sincronización Dinámica de Configuración**: Mejoras en la gestión de configuraciones desde ``extension.ts``." }
    @{ tag = "v0.0.10"; commit = "238ef54"; title = "Lanzamiento v0.0.10"; notes = "⚡ **Auto-Arranque Inteligente**: El menú interactivo de temas se ejecuta automáticamente la primera vez que instalas la extensión." }
    @{ tag = "v0.0.11"; commit = "21b594d"; title = "Lanzamiento v0.0.11"; notes = "🤖 **Sistema de Lanzamientos con IA**: Integración de una habilidad inteligente que automatiza la creación de notas de versión y sincroniza los archivos ``.md``." }
    @{ tag = "v0.0.12"; commit = "0650552"; title = "Lanzamiento v0.0.12"; notes = "📖 **Documentación Histórica**: Reconstrucción y sincronización completa del historial de versiones desde el inicio del proyecto hasta hoy." }
)

Write-Host "Borrando releases antiguos..."
gh release delete v0.0.1 -y --cleanup-tag 2>$null
gh release delete v0.0.11 -y --cleanup-tag 2>$null
gh release delete v0.0.12 -y --cleanup-tag 2>$null

foreach ($rel in $releases) {
    Write-Host "Creando release $($rel.tag)..."
    if ($rel.tag -eq "v0.0.12") {
        gh release create $($rel.tag) "./releases/current/terminal-setup-style-0.0.12.vsix" --target $($rel.commit) --title $($rel.title) --notes $($rel.notes)
    } elseif ($rel.tag -eq "v0.0.11") {
        gh release create $($rel.tag) "./releases/previous/terminal-setup-style-0.0.11.vsix" --target $($rel.commit) --title $($rel.title) --notes $($rel.notes)
    } else {
        gh release create $($rel.tag) --target $($rel.commit) --title $($rel.title) --notes $($rel.notes)
    }
}
Write-Host "¡Releases creados con éxito!"
