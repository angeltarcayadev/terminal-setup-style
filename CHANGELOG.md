# Change Log

All notable changes to the "terminal-setup-style" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.5]
- 🎨 **Regreso a SVG Puro**: Se revirtió la galería a formato vectorial `.svg` nativo a petición del usuario para garantizar la calidad visual más perfecta con las etiquetas HTML `<div>` e `<img>`, ignorando advertencias obsoletas de ciertos parsers.
- 🧹 **Limpieza Total**: Eliminación de todos los scripts temporales, imágenes `.png` innecesarias y cachés de renderizado residual.

## [0.1.4]
- 🖼️ **Galería Completamente Restaurada**: Conversión nativa a imágenes PNG premium para garantizar renderizado perfecto y evitar los baneos de SVG en VS Code Marketplace.
- 🚀 **Optimización de Rendimiento**: Mejora en los metadatos de activación (`activationEvents`) para iniciar solo cuando sea necesario.
- 🐛 **Corrección de Freeze**: Supresión del uso de `freeze` debido a crash críticos de memoria en la máquina huésped; se generaron por vías de renderizado directo (`PyMuPDF`).

## [0.1.3]
- 💎 **Diseños Premium Dinámicos**: ¡Rediseño visual masivo! Ahora los temas no solo cambian de color, sino que incluyen **múltiples estructuras arquitectónicas** (bordes redondeados, estilo powerline, diamantes, minimalista y rectos).
- ☁️ **Sincronización en la Nube**: Para garantizar la máxima calidad de los diseños y que obtengas siempre la versión más moderna y perfecta, la arquitectura de los temas ahora se descarga dinámicamente en tiempo real al aplicar tu selección.
- ✨ **Mejora del Instalador**: El script de instalación también se ha unificado con este motor de descarga en la nube, garantizando que los diseños se inyecten de forma óptima manteniendo tu logo ASCII intacto en cualquier entorno.

## [0.1.2]
- ✨ **Arte ASCII Dinámico**: Integración del paquete `figlet` para generar texto ASCII gigante nativamente en TypeScript. Ahora se puede cambiar el banner del perfil al instante desde la configuración de VS Code.
- 🖼️ **Nueva Galería de Temas (PNG)**: Rediseño completo de la tabla del README.md, ahora es una cuadrícula centrada con imágenes reales `.png` para asegurar compatibilidad total con la publicación en Marketplace de VS Code.

## [0.1.1]
- 🐛 **Corrección de Build**: Reversión temporal y solución a bloqueos de `vsce` generados por el uso de imágenes `.svg` en la documentación.

## [0.1.0]
- 🏆 **Automatización de Screenshots**: Implementación de scripts avanzados (Python/PowerShell) para generar vistas previas de los 19 temas sin romper los flujos de memoria en Windows.

## [0.0.17]
- 🐛 **Corrección de Visualización**: Se revirtió el diseño HTML de la terminal a Markdown puro (Tabla de Colores), ya que GitHub limpia los estilos CSS por seguridad, lo cual rompía la visualización.

## [0.0.16]
- 🎨 **Ventana de Terminal Simulada**: Se incorporó una elegante ventana de terminal con renderizado HTML y CSS (estilo Mac) en el README principal.

## [0.0.15]
- 🎨 **Galería Visual de Temas**: Se agregó una simulación visual y galería de los 19 temas disponibles directamente en el `README.md` principal.

## [0.0.14]
- ✨ **9 Nuevos Temas Inspirados**: Se integraron 9 temas nuevos (`catppuccin`, `cobalt2`, `night-owl`, `nord`, `agnoster`, `material`, `spaceship`, `powerlevel10k`, `paradox`).

## [0.0.13]
- 🎨 **Personalización Total de ASCII**: Nuevo ajuste en VS Code para cambiar dinámicamente el color del arte ASCII, y se añadió enlace al generador de letras en la documentación.

## [0.0.12]
- 📖 **Documentación Histórica**: Reconstrucción y sincronización completa del historial de versiones desde el inicio del proyecto hasta hoy.

## [0.0.11]
- 🤖 **Sistema de Lanzamientos con IA**: Integración de una habilidad inteligente que automatiza la creación de notas de versión y sincroniza los archivos `.md`.

## [0.0.10]
- ⚡ **Auto-Arranque Inteligente**: El menú interactivo de temas se ejecuta automáticamente la primera vez que instalas la extensión.

## [0.0.9]
- 🔄 **Sincronización Dinámica de Configuración**: Mejoras en la gestión de configuraciones desde `extension.ts`.

## [0.0.8] - [0.0.7]
- ✨ **Menú Interactivo (QuickPick)**: Se agregó un menú desplegable para elegir el tema directamente al ejecutar el comando.
- 🎨 **Generación Dinámica de Temas**: Ahora los archivos `.omp.json` se generan dinámicamente con los colores seleccionados sin depender de descargas externas.
- 📥 **Descarga Automática de Fuentes**: Instalación de *FiraCode Nerd Font* y *CaskaydiaCove Nerd Font* automáticamente sin pedir permisos de administrador.

## [0.0.6] - [0.0.5]
- ⚙️ **Comando de Instalación Integrado**: Lógica principal para la sincronización de temas y la ejecución remota de instalación desde la terminal.

## [0.0.4] - [0.0.2]
- 🖼️ **Mejoras Visuales e Integración**: Adición del logo oficial (`icon.png`) y optimización del empaquetado.
- 🔧 Añadidas las configuraciones personalizadas al panel de VS Code.
- 📜 Creación del script `build-release.ps1` para automatización de compilación.

## [0.0.1] - Lanzamiento Inicial
- 🚀 Lanzamiento inicial del repositorio.
- 🔌 Conexión directa con el script instalador remoto de PowerShell pasando variables de entorno.