---
name: svg_freeze
description: Skill para automatizar la generación de imágenes SVG de alta calidad de los temas usando la herramienta freeze.
---

# SVG Freeze Skill

Esta habilidad automatiza la toma de "capturas de pantalla" hermosas en formato SVG usando `charmbracelet/freeze`.

## Instrucciones para el Agente (IA)

Cuando el usuario te pida generar SVGs o "tomar fotos" de temas:
1. Asegúrate de tener los nombres de los temas que quiere capturar.
2. Si no especifica temas, pregúntale cuáles desea, o revisa la carpeta `themes/`.
3. Informa al usuario que generarás los SVGs y que le dejarás un comando listo, O BIEN, corre el script `.agents/skills/svg_freeze/scripts/run-freeze.ps1 -Themes "tema1,tema2"`. (Como `freeze` puede colgarse en el entorno headless, es mejor que le proveas el comando exacto al usuario para que lo corra en su terminal, o intentes correr el script en segundo plano).
4. El script generará los `.svg` en `assets/svg/`.
