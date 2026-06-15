# 🤖 Modello AI Usato

## Claude Opus 4.7 (Più Potente - Versione Attuale)

### Specifiche Tecniche

- **Modello**: `claude-opus-4-7-20250219`
- **Capability**: Vision (analisi immagini)
- **Context Window**: 200,000 token
- **Costo**: $15/1M input token, $75/1M output token
- **Velocità**: Lenta ma accuratissima

### Perché Opus 4.7?

✅ **Riconoscimento dipinti TOP**: Conosce migliaia di opere d'arte  
✅ **Analisi stilistica profonda**: Identifica movimenti artistici, tecnica  
✅ **Testo dettagliato**: Descrizioni ricche e significative  
✅ **Interpretazione**: Capisce simbolismi e significati  

### Alternativa: Claude Sonnet 4.6 (Veloce + Economico)

Se vuoi **velocità > accuratezza**:

```python
# In tools/analyze_painting.py, cambia:
model="claude-sonnet-4-6-20250514"
```

- **Costo**: $3/1M input, $15/1M output (5x più economico)
- **Velocità**: 3x più veloce
- **Qualità**: Ancora molto buona

---

## Costi Stimati

### Per Immagine Media

**Claude Opus 4.7**
- Input: ~1200 token → $0.018
- Output: ~450 token → $0.034
- **Totale: ~$0.05 per analisi**

**Claude Sonnet 4.6**
- Input: ~1200 token → $0.0036
- Output: ~450 token → $0.0068
- **Totale: ~$0.01 per analisi**

---

## Come Cambiare Modello

1. Apri `tools/analyze_painting.py`
2. Cerca: `model="claude-opus-4-7-20250219"`
3. Sostituisci con:
   - Sonnet: `"claude-sonnet-4-6-20250514"`
   - Haiku (velocissimo): `"claude-haiku-4-5-20251001"`

---

## Qualità per Modello

| Aspetto | Haiku | Sonnet | Opus |
|---------|-------|--------|------|
| Velocità | ⚡⚡⚡ | ⚡⚡ | ⚡ |
| Costo | 💰 | 💰💰 | 💰💰💰 |
| Riconoscimento dipinti | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Analisi artistiche | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Interpretazione | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## Raccomandazione

**Inizia con Opus 4.7** (attuale) → Fornisce risultati incredibili  
**Passa a Sonnet 4.6** se troppe analisi → 5x più economico  
**Usa Haiku** solo per test veloci

---

## Monitor Costi

Visualizza in tempo reale i tuoi costi:
https://console.anthropic.com/account/usage

---

## Vision Capabilities

Tutti i modelli Claude supportano vision per:
- Fotografie
- Screenshots
- Diagrammi
- Grafici
- **Dipinti e opere d'arte** ← Il nostro caso!

Non è necessario inviare testo, solo l'immagine!

---

## Esempi di Output

### Input
```
Foto di "La Notte Stellata" di Van Gogh
```

### Output (da Opus 4.7)
```
{
  "title": "The Starry Night (La Notte Stellata)",
  "artist": "Vincent van Gogh",
  "year": "1889",
  "style": "Post-Impressionismo",
  "meaning": "Una rappresentazione emozionale e spirituale della notte, 
             che riflette l'ansia e la ricerca di ordine cosmico...",
  "location": "Museum of Modern Art (MoMA), New York",
  "materials": "Olio su tela",
  "color_palette": "Blu scuro dominante, giallo luminoso, bianco",
  "description": "Il capolavoro mostra un cielo turbinento...",
  "interesting_facts": "Dipinto durante il ricovero a Saint-Paul-de-Mausole...
                        È una delle opere più riconoscibili al mondo..."
}
```

---

Domande? Vedi la documentazione API: https://docs.anthropic.com/
