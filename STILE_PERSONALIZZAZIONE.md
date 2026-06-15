# 🎨 Personalizzazione dello Stile - Artemis AI Theme

## ✅ Elementi Uguali a Artemis AI

Il nostro design include:

- ✅ **Dark Theme** - Sfondo scuro elegante
- ✅ **Glassmorphism** - Effetti blur trasparenti
- ✅ **Rounded Corners** - Bordi arrotondati soft
- ✅ **Gradients** - Sfumature purple/blue
- ✅ **Smooth Animations** - Transizioni fluide
- ✅ **Box Shadows** - Ombre sofisticate
- ✅ **Numeric Keypad** - Login con 8 cifre
- ✅ **Center Button** - Bottone circolare con puntino
- ✅ **Bottom Navigation** - Barra con 4 voci
- ✅ **Gallery Strip** - Immagini in basso

---

## 🎯 Come Personalizzare i Colori

### Colori Attuali (Artemis AI Theme)

Apri `frontend/styles.css` e cerca le variabili di colore:

```css
/* Line ~25 circa */
:root {
    --primary: #667eea;        /* Blu-viola principale */
    --primary-dark: #764ba2;   /* Viola scuro */
    --accent: #38ef7d;         /* Verde accento */
    --dark-bg: #0a0e27;        /* Nero sfondo */
    --card-bg: #ffffff;        /* Bianco card */
    --text-primary: #1a1a2e;   /* Nero testo */
    --text-secondary: #666;    /* Grigio testo */
}
```

### Personalizzazione Colori

**Tema Rosso (Passionale):**
```css
--primary: #ff6b6b;
--primary-dark: #ee5a6f;
--accent: #ff8787;
```

**Tema Verde (Naturale):**
```css
--primary: #11998e;
--primary-dark: #38ef7d;
--accent: #38ef7d;
```

**Tema Giallo (Energico):**
```css
--primary: #ffd700;
--primary-dark: #ffed4e;
--accent: #ff9800;
```

**Tema Rosa (Moderno):**
```css
--primary: #ff006e;
--primary-dark: #d62828;
--accent: #f72585;
```

---

## 🌈 Elementi da Personalizzare

### 1. Colori Bottoni
In `styles.css`, cerca `.btn-primary`:

```css
.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Cambia i colori hex!

### 2. Sfondo Login
Cerca `.login-screen`:

```css
.login-screen {
    background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d2138 100%);
}
```

### 3. Font
Cerca `font-family`:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

Cambia in qualsiasi font Google Fonts!

---

## 📝 Effetti Personalizzabili

### Blur Strength
```css
backdrop-filter: blur(20px);  /* Cambia 20px in 10px o 30px */
```

### Box Shadows
```css
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);  /* Intensità ombra */
```

### Border Radius (Spigoli)
```css
border-radius: 24px;  /* Cambia in 8px per spigoli vivi */
```

---

## 🎬 Animazioni

### Velocità Transizioni
Cerca `transition:` e modifica:

```css
transition: all 0.3s ease;  /* 0.3s = velocità */
```

**Velocità comuni:**
- `0.1s` - Molto veloce
- `0.3s` - Standard
- `0.6s` - Lento
- `1s` - Molto lento

---

## 🔄 Tema Completo - Template

Salva questa config in `frontend/theme.css` per un tema custom:

```css
:root {
    /* Colori */
    --primary: #667eea;
    --primary-dark: #764ba2;
    --accent: #38ef7d;
    --dark-bg: #0a0e27;
    
    /* Transizioni */
    --transition-fast: 0.2s;
    --transition-normal: 0.3s;
    --transition-slow: 0.6s;
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    
    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 24px;
}
```

Poi usalo ovunque:
```css
background: var(--primary);
border-radius: var(--radius-lg);
transition: all var(--transition-normal);
```

---

## 🎯 Preset Temi Veloci

### Dark Minimal
```css
--primary: #ffffff;
--accent: #999999;
backdrop-filter: blur(5px);  /* Meno blur */
```

### Neon Glow
```css
--primary: #00ff88;
--accent: #00ffff;
filter: brightness(1.2);
text-shadow: 0 0 10px currentColor;
```

### Soft Pastel
```css
--primary: #b98dd9;
--accent: #a8dadc;
background-filter: blur(30px);  /* Più blur */
opacity: 0.95;
```

---

## 💾 Vercel: Temi Dinamici

Per supportare temi su Vercel, aggiungi in `.env.production`:

```
THEME_COLOR_PRIMARY=#667eea
THEME_COLOR_ACCENT=#38ef7d
```

---

## ✨ Final Result

Con questi cambiamenti, puoi:
- ✅ Cambiare colori completamente
- ✅ Personalizzare velocità animazioni
- ✅ Modificare spigoli e ombre
- ✅ Aggiungere temi dinamici
- ✅ Mantieni il design Artemis AI

---

**Suggerimento:** Testa sempre i cambiamenti su localhost prima di deployare! 🚀
