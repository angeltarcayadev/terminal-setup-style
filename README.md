# Terminal Setup Style by Angel-T Dev 🚀

¡Transforma la aburrida terminal por defecto de Visual Studio Code en una herramienta profesional, colorida y con iconos increíbles con un solo comando!

<div align="center">
<!-- Contenedor Principal de la Terminal -->
<div style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 6px; font-family: 'FiraCode Nerd Font', 'Segoe UI Mono', monospace; padding: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); color: #c9d1d9; font-size: 13px; line-height: 1.6; text-align: left; max-width: 800px; margin: 0 auto;">
  
  <!-- Barra Superior de la Ventana (Botones Mac Style) -->
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #21262d; padding-bottom: 8px;">
    <div style="display: flex; gap: 6px;">
      <span style="width: 12px; height: 12px; background-color: #ff5f56; border-radius: 50%; display: inline-block;"></span>
      <span style="width: 12px; height: 12px; background-color: #ffbd2e; border-radius: 50%; display: inline-block;"></span>
      <span style="width: 12px; height: 12px; background-color: #27c93f; border-radius: 50%; display: inline-block;"></span>
    </div>
    <span style="color: #8b949e; font-size: 11px;">pwsh.exe - Terminal Setup Style (Angel-T Dev)</span>
    <div style="width: 48px;"></div> <!-- Balanceador visual -->
  </div>

  <!-- Contenido de la Terminal (Línea superior dividida a los extremos) -->
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <!-- Lado Izquierdo: Estructura del Prompt -->
    <div>
      <span style="color: #00FF9C;">╭─</span>
      <span style="background-color: #00FF9C; color: #0d1117; padding: 2px 6px; border-radius: 4px 0 0 4px; font-weight: bold;"> Angel-T</span>
      <span style="color: #00FF9C; background-color: #008F56;"></span>
      <span style="background-color: #008F56; color: #ffffff; padding: 2px 6px;"> ~/Proyectos/App</span>
      <span style="color: #008F56; background-color: transparent;"></span>
      <span style="color: #27c93f; margin-left: 8px;"> main</span>
      <span style="color: #ffbd2e; margin-left: 4px;">⇡1 📝 +2</span>
    </div>
    <!-- Lado Derecho: Tiempos y Estado -->
    <div style="color: #8b949e; text-align: right;">
      <span style="color: #50fa7b;">12ms</span> 📊 MEM: <span style="color: #ffb86c;">45.2%</span> <span style="color: #6272a4;">(14/32GB)</span>
    </div>
  </div>

  <!-- Segunda Línea: Directorio actual, Prompt y Cursor -->
  <div style="margin-top: 6px;">
    <span style="color: #00FF9C;">╰─</span>
    <span style="color: #27c93f; margin-left: 4px;"> v18.17.0</span>
    <span style="color: #89B4FA; margin-left: 8px;"> 14:30</span>
    <span style="color: #00FF9C; margin-left: 8px; font-weight: bold;">❯</span>
    <!-- Cursor parpadeante simulado -->
    <span style="background-color: #f8f8f2; color: #f8f8f2; animation: blink 1s infinite; width: 8px; height: 15px; display: inline-block; vertical-align: middle; margin-left: 4px;">_</span>
  </div>

  <!-- Texto de salida inferior -->
  <div style="margin-top: 15px; color: #8b949e; font-size: 12px; text-align: right;">
    Tema en pantalla: <b>angel-cyberpunk</b>
  </div>

</div>
</div>

---

## ✨ Características

* **Instalación de 1 Clic:** Olvídate de configuraciones largas en PowerShell. La extensión hace todo el trabajo pesado.
* **Motor Oh My Posh:** Inyecta un diseño visual moderno y fácil de leer directamente en tu editor.
* **Iconografía Avanzada:** Soporte total para iconos de carpetas, estado de Git y lenguajes de programación.
* **Integración Nativa:** Modifica automáticamente el `settings.json` de VS Code para aplicar la fuente correcta sin que tengas que buscarla.

## 📋 Requisitos Previos

¡Buenas noticias! A partir de la versión **0.0.7**, la extensión **descarga e instala automáticamente** las fuentes necesarias (*FiraCode Nerd Font* y *CaskaydiaCove Nerd Font*) en tu perfil de usuario (sin requerir permisos de administrador). 

*Nota: Solo si experimentas algún fallo en la descarga automática, puedes instalarlas manualmente desde la página de [Nerd Fonts](https://www.nerdfonts.com/).*

## 🚀 Cómo Usarla

1. Abre Visual Studio Code.
2. Abre la Paleta de Comandos presionando `Ctrl` + `Shift` + `P`.
3. Escribe y selecciona el comando: **`Angel-T Dev: Instalar Terminal Setup`**.
4. ¡Espera el mensaje de éxito, abre una nueva terminal y disfruta tu nuevo entorno!

## ⚙️ Personalización (Configuración)

Esta extensión utiliza la interfaz nativa de configuración de Visual Studio Code para que puedas modificar tus parámetros de forma integrada y sin complicaciones:

1. Abre la configuración de VS Code presionando `Ctrl` + `,` (o ve a *Archivo > Preferencias > Configuración*).
2. En la barra de búsqueda superior, escribe: **`Terminal Setup Style`**.
3. Verás los campos de personalización listos para ser editados:
   * **Nombre**: El nombre que se mostrará en tu prompt de PowerShell.
   * **Fuente**: El nombre de tu Nerd Font instalada.
   * **Tema**: Menú desplegable para seleccionar tu tema de Oh My Posh favorito.
   * **Color ASCII**: Menú desplegable para elegir el color del Arte ASCII de bienvenida (usa 'auto' para usar el del tema).
4. Modifica los valores. Se guardarán automáticamente de forma global en tu VS Code.
5. Abre la Paleta de Comandos (`Ctrl` + `Shift` + `P`) y ejecuta **`Angel-T Dev: Instalar Terminal Setup`** para aplicar e instalar la terminal con tu nueva configuración.

> 💡 **Tip:** ¿Quieres crear tus propias letras gigantes personalizadas para la terminal? Genera las tuyas usando [TAAG Generator (Font: ANSI Shadow)](https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow).

## 🛠️ Notas de Versión

### v0.0.15
* **Galería Visual de Temas**: Se agregó una simulación visual y galería de los 19 temas disponibles directamente en el `README.md` principal.

### v0.0.14
* **9 Nuevos Temas Inspirados**: Se integraron 9 temas nuevos (`catppuccin`, `cobalt2`, `night-owl`, `nord`, `agnoster`, `material`, `spaceship`, `powerlevel10k`, `paradox`).

### v0.0.13
* **Personalización Total de ASCII**: Nuevo ajuste en VS Code para cambiar dinámicamente el color del arte ASCII, y se añadió enlace al generador de letras en la documentación.

### v0.0.12
* **Documentación Histórica**: Reconstrucción y sincronización completa del historial de versiones desde el inicio del proyecto.

### v0.0.11
* **Sistema de Lanzamientos con IA**: Integración de una habilidad inteligente que automatiza la creación de notas de versión y sincroniza los archivos `.md`.

### v0.0.10
* **Auto-Arranque Inteligente**: El menú interactivo de temas se ejecuta automáticamente la primera vez que instalas la extensión, guiando al usuario de inmediato.

### v0.0.9
* **Sincronización Dinámica de Configuración**: Mejoras en la gestión dinámica de configuraciones desde `extension.ts` para aplicar temas instantáneamente sin recargar.

### v0.0.8 / v0.0.7
* **Menú Interactivo (QuickPick)**: Se agregó un menú desplegable para elegir el tema directamente al ejecutar el comando.
* **Generación Dinámica de Temas**: Ahora los archivos `.omp.json` se generan dinámicamente con los colores exactos seleccionados.
* **Descarga Automática de Fuentes**: Instalación de Nerd Fonts de forma silenciosa y sin permisos de administrador.

### v0.0.6 / v0.0.5
* **Comando de Instalación Integrado**: Implementación de la lógica principal para la sincronización de temas y la ejecución remota de instalación desde la terminal.

### v0.0.4 / v0.0.2
* **Mejoras Visuales e Integración**: Adición del logo oficial (`icon.png`) y optimización de la estructura. 
* Añadidas las configuraciones personalizadas al panel de VS Code (Nombre, Fuente y Tema).
* Creación del script `build-release.ps1` para un empaquetado y versionado automatizado.

### v0.0.1
* Lanzamiento inicial del repositorio.
* Conexión directa con el script instalador remoto de PowerShell pasando variables de entorno de manera segura.
* Soporte MIT Open Source y licencia oficial en el repositorio.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el código fuente y úsalo libremente para tus desarrollos.

---
*Desarrollado con 💻 y ☕ por [Angel Eduardo Tarcaya](https://github.com/angeltarcayadev)*
