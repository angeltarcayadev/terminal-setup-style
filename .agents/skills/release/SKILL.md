---
name: release
description: Automatiza la creación de una nueva versión leyendo los cambios, actualizando CHANGELOG.md y corriendo el script build-release.ps1.
---

# Release Skill

Esta habilidad se encarga puramente de gestionar la subida de versión y empaquetamiento, dejando el control de versiones (Git) a la habilidad `github_sync`.

## Instrucciones para el Agente (IA)

Cuando el usuario invoque esta habilidad (ej. "Prepara la versión patch" o "/release patch"), debes realizar los siguientes pasos automatizados:

1. **Revisar cambios**: Revisa el historial de Git o recuerda las acciones realizadas en la sesión para entender qué nuevas funciones o correcciones se han hecho.
2. **Generar Notas con IA**: Genera una descripción atractiva resumiendo las novedades.
3. **Actualizar CHANGELOG.md**: Agrega la nueva versión y las notas generadas al principio del archivo.
4. **Ejecutar script de compilación**: Ejecuta el comando `.\build-release.ps1 -bump patch` (o `minor`/`major` según se pida) en la carpeta de la extensión para empaquetar el nuevo `.vsix`.
5. **No hacer Push**: NO corras `git push`. Esa responsabilidad ahora recae en la habilidad `github_sync`. Solo indícale al usuario que el empaquetado finalizó exitosamente y sugiera usar `github_sync` para subir el código.
