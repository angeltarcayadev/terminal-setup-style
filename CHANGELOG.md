# Registro de Cambios (Changelog)

Todos los cambios notables en este proyecto se documentarán en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto se adhiere al [Versionamiento Semántico](https://semver.org/lang/es/).

## [0.1.24] - 2026-07-14
### Modificado
- **Unificación de Fuentes**: Se estandarizó el uso de `FiraCode Nerd Font Mono` como la fuente predeterminada y obligatoria en todo el proyecto y los temas para evitar problemas de visualización e íconos.

## [0.1.23] - 2026-07-13
### Arreglos Críticos
- **Empaquetado Definitivo de Dependencias**: Se corrigió definitivamente el problema de `"command not found"` garantizando que la librería interna (figlet) se empaquete correctamente usando la última versión del motor `@vscode/vsce`.
- **Manejo de Errores Robustecido**: Se implementó una capa de protección adicional en la inicialización de la extensión que, en caso de cualquier error, mostrará una ventana emergente descriptiva en lugar de fallar silenciosamente.

## [0.1.17] - Reciente
### Correcciones
- Solucionado el error `command not found` limpiando la caché de dependencias y re-empaquetando la extensión con soporte total para `figlet`.
- Se redirigió el script de instalación (`install.ps1`) para descargar los temas desde nuestro repositorio nativo en vez del de Oh My Posh, solucionando las descargas rotas de los temas personalizados (`oficial_premium`, `custom_pastel`, etc.).

## [0.1.16] - Anterior
### Añadido
- Primera prueba de extremo a extremo de la nueva automatización completa de lanzamientos (Release Skill) utilizando la CLI de GitHub.

## [0.1.15] - Anterior
### Correcciones
- La insignia de versión en el README ahora apunta dinámicamente al archivo `package.json` para reflejar la versión correcta.

## [0.1.14] - Anterior
### Correcciones
- Reempaquetado del archivo `.vsix` para asegurar la correcta estabilización del parche de comandos y activación.

## [0.1.13] - Anterior
### Correcciones
- Se corrigió el error `command 'terminal-setup-style.install' not found` agregando los `activationEvents` faltantes en el `package.json`.

## [0.1.12] - Anterior
### Añadido
- 8 nuevos temas personalizados (`custom_pastel`, `custom_palette`, `custom_minimal`, `custom_powerline`, `custom_split`, `custom_neon`, `custom_aqua`, `custom_dev`).
- Sección de "Novedades de Desarrollo" en la documentación.

### Modificado
- Refactorización a arquitectura de temas dinámicos (los temas ahora se leen localmente desde la carpeta `themes/`).
- Reescritura total de la documentación principal a español, corrigiendo problemas de codificación UTF-8.

## [0.1.11] - Anterior
### Añadido
- Nueva arquitectura modular de Temas (Themes) locales directamente desde la carpeta 	hemes/.
- 8 nuevos temas personalizados (custom_pastel, custom_palette, custom_minimal, custom_powerline, custom_split, custom_neon, custom_aqua, custom_dev).
- Scripts modulares de IA para automatizar la creación de temas y releases.

### Modificado
- Renombrado el tema oficial a oficial_premium.
- Documentación principal y código de conducta ahora completamente en español para la comunidad de habla hispana.
