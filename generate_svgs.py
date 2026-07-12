import os
import subprocess
import json
import io
import urllib.request
from rich.console import Console
from rich.text import Text

themes_custom = [
    {"Name": "default", "Color1": "#FF2A2A", "Color2": "#990000"},
    {"Name": "cyberpunk", "Color1": "#00FF9C", "Color2": "#008F56"},
    {"Name": "dracula", "Color1": "#FF79C6", "Color2": "#BD93F9"},
    {"Name": "hacker", "Color1": "#00FF00", "Color2": "#008000"},
    {"Name": "tokyo", "Color1": "#7AA2F7", "Color2": "#9ECE6A"},
    {"Name": "monokai", "Color1": "#FD971F", "Color2": "#F92672"},
    {"Name": "ocean", "Color1": "#00A8CC", "Color2": "#142850"},
    {"Name": "synthwave", "Color1": "#FF007F", "Color2": "#3A0CA3"},
    {"Name": "gruvbox", "Color1": "#FE8019", "Color2": "#D3869B"},
    {"Name": "minimal", "Color1": "#D4D4D4", "Color2": "#808080"}
]

themes_official = [
    "catppuccin_mocha", "cobalt2",
    "night-owl", "nord", "agnoster", "material",
    "spaceship", "powerlevel10k_rainbow", "paradox"
]

os.makedirs("assets", exist_ok=True)

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
          "template": " {{ if .WSL }}WSL at {{ end }}{{.Icon}} ",
          "type": "os"
        },
        {
          "background": "{C2}",
          "foreground": "#ffffff",
          "powerline_symbol": "\ue0b0",
          "properties": {
            "style": "folder"
          },
          "style": "powerline",
          "template": " \ue5fe {{ .Path }} ",
          "type": "path"
        },
        {
          "background": "#000000",
          "foreground": "{C1}",
          "powerline_symbol": "\ue0b0",
          "properties": {
            "branch_icon": "\ue725 ",
            "fetch_status": True,
            "fetch_upstream_icon": True
          },
          "style": "powerline",
          "template": " {{ .UpstreamIcon }}{{ .HEAD }}{{if .BranchStatus }} {{ .BranchStatus }}{{ end }}{{ if .Working.Changed }} \uf044 {{ .Working.String }}{{ end }}{{ if and (.Working.Changed) (.Staging.Changed) }} |{{ end }}{{ if .Staging.Changed }} \uf046 {{ .Staging.String }}{{ end }}{{ if gt .StashCount 0 }} \ueb4b {{ .StashCount }}{{ end }} ",
          "type": "git"
        }
      ],
      "type": "prompt"
    },
    {
      "alignment": "left",
      "newline": True,
      "segments": [
        {
          "foreground": "{C1}",
          "style": "plain",
          "template": "\u2570\u2500",
          "type": "text"
        },
        {
          "foreground": "#ffffff",
          "style": "plain",
          "template": " \uf0e7 ",
          "type": "text"
        },
        {
          "foreground": "#ffffff",
          "style": "plain",
          "template": "\u276f ",
          "type": "text"
        },
        {
          "foreground": "{C1}",
          "style": "plain",
          "template": "\u276f ",
          "type": "text"
        }
      ],
      "type": "prompt"
    }
  ],
  "version": 2
}

# 1. Custom themes
for t in themes_custom:
    print(f"[*] Generando captura (SVG) para CUSTOM {t['Name']}...")
    
    # create json
    import copy
    theme_json = copy.deepcopy(base_json)
    theme_json["blocks"][0]["segments"][0]["background"] = t["Color1"]
    theme_json["blocks"][0]["segments"][1]["background"] = t["Color2"]
    theme_json["blocks"][1]["segments"][0]["foreground"] = t["Color1"]
    theme_json["blocks"][1]["segments"][3]["foreground"] = t["Color1"]
    
    with open("temp_theme.json", "w", encoding="utf-8") as f:
        json.dump(theme_json, f, ensure_ascii=False)
        
    out_file = f"assets/{t['Name']}.svg"
    
    try:
        result = subprocess.run(["oh-my-posh", "print", "primary", "--config", "temp_theme.json"], capture_output=True)
        if result.returncode != 0:
            print(f"[!] oh-my-posh falló para {t['Name']}")
            continue
            
        c = Console(file=io.StringIO(), record=True, width=110)
        c.print(Text.from_ansi(result.stdout.decode('utf-8', errors='ignore')))
        c.save_svg(out_file, title=f"Theme: {t['Name']}", theme=None)
    except Exception as e:
        print(f"[!] Error generando SVG para {t['Name']}: {e}")

# 2. Official themes
for t in themes_official:
    print(f"[*] Generando captura (SVG) para OFICIAL {t}...")
    url = f"https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/{t}.omp.json"
    temp_json = "temp_theme.json"
    
    try:
        urllib.request.urlretrieve(url, temp_json)
    except Exception as e:
        print(f"[!] Tema {t} no encontrado en GitHub oficial. Omitiendo... {e}")
        continue

    out_name = t
    if t == "catppuccin_mocha": out_name = "catppuccin"
    if t == "powerlevel10k_rainbow": out_name = "powerlevel10k"

    out_file = f"assets/{out_name}.svg"
    
    try:
        result = subprocess.run(["oh-my-posh", "print", "primary", "--config", temp_json], capture_output=True)
        if result.returncode != 0:
            print(f"[!] oh-my-posh falló para {t}")
            continue
            
        c = Console(file=io.StringIO(), record=True, width=110)
        c.print(Text.from_ansi(result.stdout.decode('utf-8', errors='ignore')))
        c.save_svg(out_file, title=f"Theme: {out_name}", theme=None)
    except Exception as e:
        print(f"[!] Error generando SVG para {t}: {e}")

if os.path.exists("temp_theme.json"):
    os.remove("temp_theme.json")
    
print("[OK] ¡Todas las capturas SVG generadas exitosamente con Rich!")
