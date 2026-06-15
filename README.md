# 🎨 Analizzatore di Dipinti - AI Powered

Un'app web mobile che fotografa dipinti e ne fornisce un'analisi completa usando Claude Vision AI.

## Caratteristiche

✅ **Accesso alla fotocamera mobile** - Scatta foto direttamente dal tuo telefono  
✅ **Analisi AI avanzata** - Claude API riconosce dipinti, artisti, stili  
✅ **Risultati dettagliati** - Nome, artista, significato, ubicazione, materiali, ecc.  
✅ **Design responsivo** - Perfetto per desktop e mobile  
✅ **Economico** - Claude API è molto competitiva di prezzo  

## Architettura WAT

```
workflows/          → Istruzioni e procedure
tools/              → Script Python per l'esecuzione
backend/            → Server Node.js
frontend/           → App web HTML/CSS/JS
.env               → Credenziali API
```

## Setup

### 1. Prerequisiti

- **Node.js 18+** (per il backend)
- **Python 3.8+** (per i tool)
- **API Key Anthropic** (gratis: https://console.anthropic.com)

### 2. Installazione

```bash
# Installa dipendenze Python
pip install anthropic

# Installa dipendenze Node.js
cd backend
npm install
cd ..
```

### 3. Configura API Key

Modifica `.env`:
```
ANTHROPIC_API_KEY=your_actual_api_key_here
PORT=3000
```

### 4. Avvia il server

```bash
# Da backend/
npm start
```

Il server sarà disponibile a: **http://localhost:3000**

## Utilizzo

1. **Apri il sito** su `http://localhost:3000`
2. **Clicca "Accendi Fotocamera"** per accedere alla camera del telefono
3. **Scatta una foto** del dipinto
4. **Clicca "Analizza"** per ottenere i risultati
5. **Leggi i dettagli** - Nome, artista, significato, ecc.

## API Endpoints

### POST `/analyze`
Analizza un'immagine di un dipinto.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "La Notte Stellata",
    "artist": "Vincent van Gogh",
    "year": "1889",
    "style": "Post-Impressionismo",
    "meaning": "Un paesaggio notturno con un cielo turbinoso...",
    "size": "73.7 × 92.1 cm",
    "location": "Museum of Modern Art, New York",
    "materials": "Olio su tela",
    "color_palette": "Blu scuro, giallo, bianco",
    "description": "Descrizione dettagliata...",
    "confidence": "Alta",
    "interesting_facts": "..."
  },
  "usage": {
    "input_tokens": 1200,
    "output_tokens": 450
  }
}
```

## Costi API

**Claude API è molto economica:**
- Input: $0.003 per 1K token (vision)
- Output: $0.015 per 1K token

**Per un'analisi media:** ~$0.01-0.02 per immagine

## File Structure

```
.
├── workflows/           # Procedure e istruzioni
│   └── analyze_painting.md
├── tools/              # Script Python
│   └── analyze_painting.py
├── backend/            # Server Node.js
│   ├── server.js
│   └── package.json
├── frontend/           # App web
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .env               # Configurazione (API key)
└── README.md
```

## Troubleshooting

### Errore: "No API key found"
→ Controlla che `.env` abbia `ANTHROPIC_API_KEY` corretto

### Errore: "Camera not available"
→ Consenti l'accesso alla camera nel browser
→ USA HTTPS su device reali (non localhost)

### Errore: "Python command not found"
→ Assicurati che Python 3 sia installato e nel PATH
→ Usa `python3` invece di `python` se su macOS/Linux

### Immagini bloccate
→ Riduci la qualità dell'immagine in `app.js` (line 107: cambia 0.8 in 0.6)

## Deployment

### Vercel (consigliato - gratuito)

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Heroku

```bash
heroku create
git push heroku main
```

### Docker

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN pip install anthropic
CMD ["npm", "start"]
```

## Miglioramenti Futuri

- [ ] Salvataggio della storia delle analisi
- [ ] Integrazione con Google Sheets per esportare risultati
- [ ] Supporto per gallerie di immagini
- [ ] Comparazione tra dipinti
- [ ] Database locale con cache dei dipinti noti

## License

MIT

## Support

Per problemi o domande:
- 📧 Email: truffaelisa@gmail.com
- 🤖 Powered by Claude AI
