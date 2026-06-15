#!/usr/bin/env python3
"""
Analyzes a painting image using Google Gemini Vision API (FREE).
"""

import google.generativeai as genai
import base64
import json
import sys
import os
from pathlib import Path

def analyze_painting(image_base64: str) -> dict:
    """
    Analyze a painting image using Google Gemini API vision capabilities.
    COMPLETELY FREE!

    Args:
        image_base64: Base64-encoded image data (without data: prefix)

    Returns:
        Dictionary with analysis results
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {
            "success": False,
            "error": "GEMINI_API_KEY not found in .env"
        }

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash-exp")

    prompt = """Analizza questo dipinto in dettaglio. Fornisci una risposta in JSON valido con i seguenti campi:

{
  "title": "Nome del dipinto (se riconoscibile)",
  "artist": "Nome dell'artista (se riconoscibile)",
  "year": "Anno/periodo stimato",
  "style": "Movimento artistico/stile (es. Rinascimento, Impressionismo, ecc)",
  "meaning": "Significato, tema principale, interpretazione",
  "size": "Dimensioni stimate se visibili",
  "location": "Ubicazione nota (museo, galleria, proprietà privata)",
  "materials": "Materiali identificabili (olio, acquerello, tempera, ecc)",
  "color_palette": "Palette di colori dominanti",
  "description": "Descrizione dettagliata della composizione, soggetti, dettagli",
  "confidence": "Livello di sicurezza (alta/media/bassa) se non sei sicuro dell'identificazione",
  "interesting_facts": "Aneddoti, curiosità storiche, fatti interessanti"
}

Se non riconosci il dipinto, fornisci comunque un'analisi stilistica e descrittiva dettagliata.
Rispondi SOLO con il JSON valido, senza testo aggiuntivo."""

    try:
        # Convert base64 to bytes
        image_bytes = base64.b64decode(image_base64)

        # Call Gemini with image
        response = model.generate_content([
            {
                "mime_type": "image/jpeg",
                "data": image_bytes,
            },
            prompt
        ])

        # Extract text response
        response_text = response.text.strip()

        # Parse JSON
        analysis = json.loads(response_text)
        return {
            "success": True,
            "data": analysis
        }

    except json.JSONDecodeError as e:
        return {
            "success": False,
            "error": f"Failed to parse JSON response: {str(e)}",
            "raw_response": response_text
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"API Error: {str(e)}"
        }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_painting.py <base64_image>")
        sys.exit(1)

    image_b64 = sys.argv[1]
    result = analyze_painting(image_b64)
    print(json.dumps(result, indent=2, ensure_ascii=False))
