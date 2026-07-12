---
name: release
description: Automatiza la creación de una nueva versión leyendo los cambios, usando IA para generar las notas de versión, actualizando los .md y corriendo el script build-release.ps1.
---

# Instrucciones de la Habilidad "release"

Cuando el usuario invoque esta habilidad (ej. "Prepara la versión patch" o "/release patch"), debes realizar los siguientes pasos de forma automatizada:

1. **Revisar cambios**: Revisa el historial de Git o recuerda las acciones realizadas en la sesión para entender qué nuevas funciones o correcciones se han hecho.
2. **Generar Notas con IA**: Genera una descripción atractiva y breve (como viñetas) resumiendo las novedades y la versión que corresponde (ej. `v0.0.10`).
3. **Actualizar Markdown (Ambos proyectos)**:
   - Modifica `c:\Users\angel\Desktop\Terminal-Setup\terminal-setup-style\README.md` (agregando la versión y las notas generadas).
   - Modifica `c:\Users\angel\Desktop\Terminal-Setup\terminal-setup-style\CHANGELOG.md`.
   - Revisa si es necesario añadir las mismas notas en `c:\Users\angel\Desktop\Terminal-Setup-1\README.md`.
4. **Ejecutar script de compilación**: Una vez sincronizados y guardados los archivos, ejecuta el comando `.\build-release.ps1 -bump patch` (o `minor`/`major` según se pida) en la carpeta de la extensión para empaquetar el nuevo `.vsix`.
5. **Git Push**: Ejecuta `git add .`, `git commit -m "Lanzamiento v[version]: [Notas breves]"` y `git push` en ambos repositorios para guardar los cambios en la nube.
6. **Publicar en GitHub Releases**: Usando la GitHub CLI, ejecuta `gh release create v[version] ./releases/current/terminal-setup-style-[version].vsix --title "Lanzamiento v[version]" --notes "[Notas generadas en markdown]"` dentro de la carpeta `terminal-setup-style`.
7. **Confirmar**: Avisa al usuario que el paquete ha sido empaquetado y subido automáticamente a GitHub Releases, y que ahora solo falta subir el `.vsix` al Visual Studio Marketplace.
