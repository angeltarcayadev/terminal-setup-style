---
name: github_sync
description: Skill para sincronizar los cambios locales con el repositorio remoto de GitHub de forma automática. Realiza `git add`, `git commit` y `git push`.
---

# GitHub Sync Skill

This skill automates the process of committing and pushing changes to GitHub.

## Instrucciones para el Agente (IA)

Cuando el usuario pida guardar, sincronizar o subir cambios a GitHub, debes:
1. Usar la terminal para ejecutar `git status` y ver los archivos modificados.
2. Analizar brevemente de qué tratan los cambios realizados.
3. Usar tu inteligencia para redactar un mensaje de commit semántico, claro y profesional en inglés o español según el contexto (ej. `feat: add new custom themes`).
4. Ejecutar el comando combinado directamente: `git add . ; git commit -m "tu mensaje" ; git push`
5. Responderle al usuario confirmando que los cambios han sido subidos al repositorio exitosamente.
6. **MUY IMPORTANTE:** El usuario especificó que esta acción debe ser AUTOMÁTICA. NO debes pedir permiso para hacer el push, simplemente hazlo.
