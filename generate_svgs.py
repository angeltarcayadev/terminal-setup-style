import os
import subprocess
import json

themes = [
    {"Name": "angel-default", "Color1": "#FF2A2A", "Color2": "#990000"},
    {"Name": "angel-cyberpunk", "Color1": "#00FF9C", "Color2": "#008F56"},
    {"Name": "angel-dracula", "Color1": "#FF79C6", "Color2": "#BD93F9"},
    {"Name": "angel-hacker", "Color1": "#00FF00", "Color2": "#008000"},
    {"Name": "angel-tokyo", "Color1": "#7AA2F7", "Color2": "#9ECE6A"},
    {"Name": "angel-monokai", "Color1": "#FD971F", "Color2": "#F92672"},
    {"Name": "angel-ocean", "Color1": "#00A8CC", "Color2": "#142850"},
    {"Name": "angel-synthwave", "Color1": "#FF007F", "Color2": "#3A0CA3"},
    {"Name": "angel-gruvbox", "Color1": "#FE8019", "Color2": "#D3869B"},
    {"Name": "angel-minimal", "Color1": "#D4D4D4", "Color2": "#808080"},
    {"Name": "angel-catppuccin", "Color1": "#CBA6F7", "Color2": "#89B4FA"},
    {"Name": "angel-cobalt2", "Color1": "#FFC600", "Color2": "#0088FF"},
    {"Name": "angel-night-owl", "Color1": "#82AAFF", "Color2": "#C792EA"},
    {"Name": "angel-nord", "Color1": "#88C0D0", "Color2": "#5E81AC"},
    {"Name": "angel-agnoster", "Color1": "#000000", "Color2": "#005FD7"},
    {"Name": "angel-material", "Color1": "#00BCD4", "Color2": "#FF9800"},
    {"Name": "angel-spaceship", "Color1": "#D33682", "Color2": "#268BD2"},
    {"Name": "angel-powerlevel10k", "Color1": "#FFD700", "Color2": "#005FFF"},
    {"Name": "angel-paradox", "Color1": "#00FF00", "Color2": "#FF00FF"}
]

os.makedirs("assets", exist_ok=True)
freeze_cmd = r"C:\Users\angel\AppData\Local\Microsoft\WinGet\Packages\charmbracelet.freeze_Microsoft.Winget.Source_8wekyb3d8bbwe\freeze_0.2.2_Windows_x86_64\freeze.exe"

base_json = {
  "$schema": "https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/schema.json",
  "blocks": [
    {
      "alignment": "left",
      "segments": [
        {
          "background": "{C1}",
          "foreground": "#0d1117",
          "leading_diamond": "\u256d\u2500 \ue0b6",
          "style": "diamond",
          "template": "\uf415 Angel-T ",
          "trailing_diamond": "\ue0b0",
          "type": "text"
        },
        {
          "background": "{C2}",
          "foreground": "#ffffff",
          "style": "diamond",
          "template": " \uf07b ~/Proyectos/Terminal-Setup ",
          "trailing_diamond": "\ue0b0",
          "type": "text"
        },
        {
          "background": "#21262d",
          "foreground": "#27c93f",
          "style": "diamond",
          "template": " \uf126 main \u21e11 \U0001f4dd +2",
          "trailing_diamond": " ",
          "type": "text"
        }
      ],
      "type": "prompt"
    },
    {
      "alignment": "left",
      "newline": True,
      "segments": [
        {
          "background": "transparent",
          "foreground": "{C1}",
          "leading_diamond": "\u2570\u2500",
          "style": "diamond",
          "trailing_diamond": " ",
          "type": "text"
        },
        {
          "background": "transparent",
          "foreground": "#27c93f",
          "style": "diamond",
          "template": " \ue718 v18.17.0 ",
          "type": "text"
        },
        {
          "background": "transparent",
          "foreground": "#89B4FA",
          "style": "diamond",
          "template": " \uf017 14:30 ",
          "type": "text"
        },
        {
          "background": "transparent",
          "foreground": "{C1}",
          "style": "diamond",
          "template": " \u276f",
          "type": "text"
        }
      ],
      "type": "prompt"
    }
  ],
  "version": 4
}

import copy

for t in themes:
    print(f"Generando SVG para {t['Name']}...")
    theme_json = copy.deepcopy(base_json)
    theme_json["blocks"][0]["segments"][0]["background"] = t["Color1"]
    theme_json["blocks"][0]["segments"][1]["background"] = t["Color2"]
    theme_json["blocks"][1]["segments"][0]["foreground"] = t["Color1"]
    theme_json["blocks"][1]["segments"][3]["foreground"] = t["Color1"]
    
    with open("temp_theme.json", "w", encoding="utf-8") as f:
        json.dump(theme_json, f, ensure_ascii=False)
    
    out_file = f"assets/{t['Name']}.svg"
    cmd = [
        freeze_cmd,
        "--execute", "oh-my-posh print primary --config temp_theme.json",
        "-o", out_file,
        "--window",
        "--border.radius", "8",
        "--padding", "15,20,15,20",
        "--margin", "20,20,20,20",
        "--theme", "dracula",
        "--font.family", "FiraCode Nerd Font"
    ]
    subprocess.run(cmd, check=True)

if os.path.exists("temp_theme.json"):
    os.remove("temp_theme.json")
print("✅ ¡Todas las capturas SVG generadas!")
