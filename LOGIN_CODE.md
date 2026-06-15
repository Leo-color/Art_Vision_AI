# 🔐 ArtVision AI - Login Access Code

## Codice di Accesso Predefinito

**Default Code: `12345678`**

---

## Come Cambiare il Codice

### Option 1: Frontend (Facile)

Apri il file `frontend/app.js` e cerca questa riga (all'inizio):

```javascript
accessCode: '12345678', // Default access code - change this!
```

Sostituisci `12345678` con il tuo codice di 8 cifre:

```javascript
accessCode: '11223344', // Nuovo codice
```

Salva il file. Il nuovo codice sarà attivo immediatamente!

---

### Option 2: Environment Variable (Per Vercel)

Nel file `.env`, aggiungi:

```
ACCESS_CODE=11223344
```

Poi modifica il frontend/app.js:

```javascript
accessCode: process.env.ACCESS_CODE || '12345678'
```

---

## ✅ Caratteristiche Login

- 🎨 **Design Artemis AI** - Dark theme elegante
- 🔐 **8 Cifre** - Codice sicuro
- ⌫ **Delete Button** - Cancella ultimi caratteri
- ✓ **Submit Button** - Conferma codice
- 🎯 **Feedback** - Erro message se sbagliato
- 💫 **Animazioni** - Smooth e fluide

---

## 🎯 Come Usare

1. **App parte** → Mostra schermata login
2. **Inserisci 8 cifre** → I puntini si riempiono
3. **Clicca ✓** → Verifica codice
4. **Se corretto** → Accedi all'app
5. **Se sbagliato** → Errore + cancella

---

## 🔒 Per Vercel

Quando deploghi su Vercel:

1. Nella dashboard Vercel → Settings → Environment Variables
2. Aggiungi: `ACCESS_CODE=12345678`
3. Redeploy

L'app leggerà il codice dalle variabili d'ambiente!

---

**Suggerimento**: Scegli un codice facile da ricordare ma sicuro! 🔐
