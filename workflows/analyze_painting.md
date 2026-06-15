# Workflow: Analizza Dipinto con AI (Google Gemini - GRATIS!)

## Obiettivo
Fotografare un dipinto e ottenere analisi completa: nome, artista, significato, grandezza, ubicazione, stile, ecc.
**100% GRATUITO con Google Gemini API!**

## Flusso

### 1. Utente Scatta Foto
- App web mobile accede alla camera del telefono
- Utente fotografa il dipinto
- Immagine viene convertita in Base64

### 2. Invio al Backend
- Frontend invia l'immagine Base64 all'endpoint `/analyze`
- Payload: `{ image: "base64_data" }`

### 3. Analisi con Google Gemini
- `tools/analyze_painting.py` riceve l'immagine
- Chiama **Google Gemini Vision API** (GRATIS!) per analizzare il dipinto
- Gemini estrae: nome, artista, anno, stile, significato, grandezza, ubicazione, materiali, ecc.

### 4. Risposta al Frontend
- Backend ritorna JSON con analisi completa
- Frontend visualizza i risultati in modo leggibile

## Input Richiesti
- Immagine del dipinto (JPEG, PNG)
- **API key Google Gemini** (nel `.env`) - GRATIS!

## Output Atteso
```json
{
  "title": "Nome Dipinto",
  "artist": "Nome Artista",
  "year": "Anno",
  "style": "Stile/Movimento",
  "meaning": "Significato e interpretazione",
  "size": "Dimensioni (se visibili/stimate)",
  "location": "Dove si trova normalmente",
  "materials": "Materiali (olio, acquerello, ecc)",
  "description": "Descrizione dettagliata",
  "confidence": "Livello di sicurezza (se artwork sconosciuto)"
}
```

## Edge Cases
- **Immagine non è un dipinto**: Return con messaggio di errore
- **Dipinto sconosciuto**: Fornire comunque analisi stilistica
- **Errore API**: Retry automatico (max 3 tentativi)
- **Image too large**: Comprimere prima di inviare
- **API rate limit**: 60 richieste al minuto (più che sufficiente)

## Tool Usato
- `tools/analyze_painting.py` - Interfaccia con **Google Gemini API** (GRATIS!)

## Costi
- **Zero costi** - API completamente gratuita
- 60 richieste al minuto incluse nel piano gratuito
- Niente carta di credito richiesta

## Setup
1. Vai a: https://aistudio.google.com/apikey
2. Copia API key
3. Incolla in `.env`: `GEMINI_API_KEY=AIzaSyD_your-key`
4. Esegui: `pip install google-generativeai`
5. Avvia: `npm start` (nella cartella backend)
