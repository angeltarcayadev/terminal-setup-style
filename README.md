# Terminal Setup Style by Angel-T Dev 🚀

¡Transforma la aburrida terminal por defecto de Visual Studio Code en una herramienta profesional, colorida y con iconos increíbles con un solo comando!

<div align="center">
  <img src="https://github.com/user-attachments/assets/c4c0e6f8-df9d-4f5a-be8e-25699a2ab0fd" alt="Vista previa de la terminal de Angel-T Dev" width="800">
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
4. Modifica los valores. Se guardarán automáticamente de forma global en tu VS Code.
5. Abre la Paleta de Comandos (`Ctrl` + `Shift` + `P`) y ejecuta **`Angel-T Dev: Instalar Terminal Setup`** para aplicar e instalar la terminal con tu nueva configuración.

## 🛠️ Notas de Versión

### v0.0.7
* **Menú Interactivo (QuickPick)**: Se agregó un menú desplegable para elegir el tema directamente al ejecutar el comando.
* **Generación Dinámica de Temas**: Ahora los archivos `.omp.json` se generan dinámicamente con los colores exactos seleccionados.
* **Descarga Automática de Fuentes**: Instalación de Nerd Fonts de forma silenciosa y sin permisos de administrador.

### v0.0.1
* Integración nativa con la interfaz de Configuración de VS Code.
* Conexión directa con el script instalador remoto pasando variables de entorno personalizadas de manera segura.
* Script build-release.ps1 automatizado para empaquetado fácil y versionado dinámico.
* Soporte MIT Open Source y licencia oficial en el repositorio.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el código fuente y úsalo libremente para tus desarrollos.

---
*Desarrollado con 💻 y ☕ por [Angel Eduardo Tarcaya](https://github.com/angeltarcayadev)*
