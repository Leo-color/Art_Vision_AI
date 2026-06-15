# 🚀 Guida di Avvio Rapido

Avvia l'app in **3 minuti**. **COMPLETAMENTE GRATUITA!** 🎉

## Passo 1: Ottieni l'API Key GRATIS (2 min)

1. Vai a https://aistudio.google.com/apikey (GOOGLE GEMINI - GRATIS!)
2. Clicca "Create API Key"
3. Copia la chiave (tipo `AIzaSyD...`)

## Passo 2: Configura il Progetto (1 min)

```bash
# Apri .env e sostituisci:
GEMINI_API_KEY=AIzaSyD_your-key-here
```

## Passo 3: Avvia l'App

### Opzione A: Windows PowerShell

```powershell
# Terminal 1: Backend
cd backend
npm install
npm start
# Output: "🎨 Painting Analyzer server running on http://localhost:3000"

# Terminal 2: Python dependencies
pip install google-generativeai python-dotenv
```

### Opzione B: Linux/macOS

```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Python dependencies
pip3 install -r requirements.txt
```

## Passo 4: Usa l'App

1. **Apri il browser**: http://localhost:3000
2. **Clicca "📷 Accendi Fotocamera"**
3. **Scatta una foto** di un dipinto
4. **Clicca "🤖 Analizza"**
5. **Vedi i risultati!**

---

## Test Veloce

Prova con un'immagine da internet:

```bash
# Scarica un'immagine di test
curl -o test_painting.jpg https://upload.wikimedia.org/wikipedia/commons/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg

# O usa semplicemente una foto di un dipinto dal tuo telefono!
```

---

## Troubleshooting Rapido

| Problema | Soluzione |
|----------|-----------|
| "Module not found: express" | `cd backend && npm install` |
| "No module named anthropic" | `pip install anthropic` |
| "Camera permission denied" | Consenti l'accesso nel browser |
| "API key not found" | Controlla `.env` |
| "Port 3000 already in use" | `netstat -ano \| findstr :3000` (Windows) oppure cambia PORT in `.env` |

---

## Prossimi Passi

- Leggi [README.md](README.md) per la documentazione completa
- Consulta [workflows/analyze_painting.md](workflows/analyze_painting.md) per i dettagli tecnici
- Deploy su Vercel per far funzionare su telefono da remoto

**Buon divertimento! 🎨🤖**
