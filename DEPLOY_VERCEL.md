# 🚀 Deploy su VERCEL - Guida Completa

## ✨ Perché Vercel?

✅ **Gratuito** - Hosting illimitato senza costi  
✅ **Automatico** - Deploy con git push  
✅ **Veloce** - CDN globale e serverless functions  
✅ **Semplice** - 5 minuti per deployare  

---

## 📋 PRE-DEPLOY CHECKLIST

- [ ] Hai la Gemini API Key? (da https://aistudio.google.com/apikey)
- [ ] Hai un account GitHub?
- [ ] Git è installato sul PC?
- [ ] Codice funziona localmente? (http://localhost:3000)

---

## 🎯 STEP-BY-STEP DEPLOY

### STEP 1: Prepara il Repo Git (1 min)

```bash
cd "C:\Users\Utente\Desktop\Sito esame"

# Inizializza repo git
git init
git add .
git commit -m "Initial commit: ArtVision app con Gemini AI"
```

### STEP 2: Crea Repo su GitHub (2 min)

1. Vai a: https://github.com/new
2. Nome repo: `artvision` (o quello che vuoi)
3. Descrizione: "AI Painting Analyzer"
4. **IMPORTANTE: Scegli PUBLIC**
5. Clicca "Create repository"

### STEP 3: Connetti il Repo Locale a GitHub (1 min)

```bash
cd "C:\Users\Utente\Desktop\Sito esame"

# Sostituisci USERNAME e REPO con i tuoi
git remote add origin https://github.com/USERNAME/artvision.git
git branch -M main
git push -u origin main
```

Fatto! Il codice è su GitHub.

### STEP 4: Connetti Vercel a GitHub (2 min)

1. Vai a: https://vercel.com/
2. Clicca "Sign Up" → Scegli "Continue with GitHub"
3. Autorizza Vercel ad accedere al tuo GitHub
4. Vercel ti mostra i tuoi repo automaticamente

### STEP 5: Deploy il Progetto (1 min)

1. Nella dashboard Vercel, clicca "Add New" → "Project"
2. Seleziona il repo `artvision`
3. Clicca "Import"
4. **Configura le variabili d'ambiente:**
   - Nome: `GEMINI_API_KEY`
   - Valore: `AIzaSyD_your_actual_key`
5. Clicca "Deploy"

**FATTO!** ✨ Il sito è online!

---

## 🎯 Risultato

Dopo il deploy, avrai un URL tipo:
```
https://artvision-xyz123.vercel.app
```

Apri questo link dal **telefono** e funzionerà perfettamente! 📱

---

## 🔄 Aggiornamenti Futuri

Ogni volta che vuoi aggiornare il sito:

```bash
git add .
git commit -m "Descrizione cambiamenti"
git push
```

Vercel deploya **automaticamente** in 30 secondi! 🚀

---

## ⚠️ Troubleshooting Deploy

### Errore: "Cannot find module 'express'"
→ Soluzione: I file sono commessi correttamente? Controlla che backend/package.json esista.

### Errore: "GEMINI_API_KEY not found"
→ Soluzione: Hai impostato la variabile in Vercel? (dashboard → Settings → Environment Variables)

### Sito non carica
→ Soluzione: Vai su Vercel dashboard → Clicca il deployment → Guarda i logs per errori

### Python non trovato
→ Soluzione: Vercel ha Python built-in, non serve installare nulla

---

## 📊 Monitoring

Una volta deployato, puoi:

1. **Vedere i logs**: Dashboard Vercel → Deployments → View Function Logs
2. **Controllare performance**: Vercel Analytics
3. **Impostare custom domain**: Settings → Domains

---

## 🎁 Bonus: Custom Domain

Se vuoi un dominio personalizzato (es: artvision.it):

1. In Vercel: Settings → Domains
2. Aggiungi il tuo dominio
3. Modifica i DNS dal registrar
4. Fatto! Accedi da mysite.com

---

## 📱 Usa da Telefono

Una volta online su Vercel:

1. Apri il link dal telefono (es: https://artvision-xyz.vercel.app)
2. Clicca "📷 Accendi Fotocamera"
3. Fotografa un dipinto
4. Clicca "Analizza"
5. Leggi i risultati!

**Completamente gratuito e online!** 🎉

---

## 🎯 Prossimi Passi

1. Segui STEP 1-5 sopra
2. Aspetta 30 secondi per il deploy
3. Apri il link Vercel
4. Testa il sito dal telefono
5. Condividi il link con chiunque! 🚀

---

**Domande?** Controlla la documentazione Vercel: https://vercel.com/docs

**Buon deployment!** 🎉
