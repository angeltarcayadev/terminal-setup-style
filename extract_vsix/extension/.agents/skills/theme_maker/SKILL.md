---
name: theme_maker
description: Skill para crear rápidamente una plantilla de un nuevo tema de Oh My Posh en la carpeta themes/ y configurarla con diseños e iconos únicos.
---

# Theme Maker Skill

Esta habilidad sirve para crear nuevos temas de Oh My Posh de forma automatizada y con diseños únicos.

## Instrucciones para el Agente (IA)

Cuando el usuario te pida crear un nuevo tema:
1. Pídele un nombre para el tema si no te lo proporcionó, o deduce uno.
2. Genera un nuevo archivo en `themes/[nombre].omp.json`.
3. Utiliza la plantilla ubicada en `.agents/skills/theme_maker/resources/template.omp.json` como base.
4. **IMPORTANTE:** El usuario indicó que NO debes dejarlo tal cual. Debes modificar creativamente los **colores (hexadecimales)**, los **iconos** y el **estilo (style: diamond, powerline, plain)** para hacer un diseño verdaderamente único.
5. Usa tu creatividad para inyectar iconos Nerd Fonts (`\ue0b0`, `\uf07b`, etc.) diferentes a los estándares.
6. Avisa al usuario cuando esté listo para que pueda seleccionarlo en su extensión y tomarle una captura.
