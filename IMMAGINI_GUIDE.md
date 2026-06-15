# 🖼️ Come Aggiungere Immagini di Dipinti Veri

## Fonti Gratuite di Immagini

### 1️⃣ **Unsplash** (Consigliato - Gratis, Alta Qualità)
👉 https://unsplash.com

- Ricerca: "painting", "art", "canvas", "masterpiece"
- Clicca immagine → Copia URL
- Incolla in `paintings.js`

### 2️⃣ **Pexels** (Gratis, Semplice)
👉 https://www.pexels.com

- Ricerca: "dipinto", "arte"
- Scarica o copia link diretto

### 3️⃣ **Pixabay** (Gratis, Varie Categorie)
👉 https://pixabay.com

- Ricerca: "painting art"
- Download gratuito

---

## Come Aggiungere Immagini al Sito

### Step 1: Trova l'Immagine
1. Vai su Unsplash.com
2. Cerca: "painting", "art", "abstract", "watercolor"
3. Clicca su un'immagine
4. Copia il URL diretto

Esempio URL:
```
https://images.unsplash.com/photo-1561214115-6d2f1b0abb80?w=500&h=500&fit=crop
```

### Step 2: Aggiungi a paintings.js
Apri `frontend/paintings.js` e aggiungi nella lista:

```javascript
{
    id: 7,
    url: 'https://tuourl.jpg?w=500&h=500&fit=crop',
    thumb: 'https://tuourl.jpg?w=100&h=100&fit=crop',
    title: 'Nome del Dipinto',
    artist: 'Nome Artista'
}
```

### Step 3: Salva e Ricarica
- Salva il file
- Ricarica il browser
- Nuova immagine appare nella gallery! ✨

---

## 🎨 Migliori Dipinti su Unsplash

Ricerca questi termini per trovare dipinti belli:

| Termini | Link |
|---------|------|
| Modern Art | https://unsplash.com/s/photos/modern-art |
| Abstract | https://unsplash.com/s/photos/abstract-art |
| Watercolor | https://unsplash.com/s/photos/watercolor |
| Oil Painting | https://unsplash.com/s/photos/oil-painting |
| Canvas | https://unsplash.com/s/photos/canvas-art |
| Impressionism | https://unsplash.com/s/photos/impressionism |

---

## ✨ Consigli per URL Immagini

**Formato Unsplash ottimale:**
```
https://images.unsplash.com/photo-[ID]?w=500&h=500&fit=crop
```

**Parametri:**
- `w=500` → Larghezza 500px
- `h=500` → Altezza 500px
- `fit=crop` → Ritaglio automatico

**Per thumbnail (piccole):**
```
?w=100&h=100&fit=crop
```

---

## 🚀 Batch: Aggiungi Molte Immagini Subito

Copia questo template e aggiungi 6+ dipinti:

```javascript
{
    id: 8,
    url: 'URL-PRINCIPALE?w=500&h=500&fit=crop',
    thumb: 'URL-PRINCIPALE?w=100&h=100&fit=crop',
    title: 'Titolo',
    artist: 'Artista'
},
```

---

## 🎯 Vercel: URL Stabili

Su Vercel, i link Unsplash funzionano perfettamente:
- ✅ Nessuna configurazione necessaria
- ✅ Immagini caricate sempre da Unsplash CDN
- ✅ Veloce e affidabile

**Non serve aggiungere API KEY!**

---

## 📝 Esempio Completo

```javascript
const paintingsLibrary = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1577720643272-265f434bd276?w=500&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1577720643272-265f434bd276?w=100&h=100&fit=crop',
        title: 'Modern Canvas',
        artist: 'Contemporary Artist'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=100&h=100&fit=crop',
        title: 'Urban Art',
        artist: 'Street Artist'
    }
    // Aggiungi più qui...
];
```

---

**Risultato:** Gallery con immagini vere di dipinti! 🎨✨
