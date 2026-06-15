import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Initialize Gemini
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Main endpoint: Analyze painting
app.post('/analyze', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  let imageBase64 = image;
  if (image.startsWith('data:image')) {
    imageBase64 = image.split(',')[1];
  }

  try {
    const result = await analyzePainting(imageBase64);

    if (result.success) {
      return res.json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Analyze painting with Gemini API
async function analyzePainting(imageBase64) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        success: false,
        error: 'GEMINI_API_KEY not configured'
      };
    }

    const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Analizza questo dipinto in dettaglio e fornisci una risposta in JSON valido (e SOLO JSON, niente altro) con i seguenti campi:

{
  "title": "Nome del dipinto",
  "artist": "Nome dell'artista",
  "year": "Anno/periodo",
  "style": "Movimento artistico/stile",
  "meaning": "Significato e interpretazione",
  "location": "Ubicazione nota",
  "materials": "Materiali",
  "color_palette": "Colori dominanti",
  "description": "Descrizione dettagliata",
  "interesting_facts": "Curiosità storiche",
  "narrative": "Racconta il dipinto come UN UNICO E FLUIDO DISCORSO, senza punti o elenchi. Parla come se stessi raccontando una storia interessante a un amico. Inizia con il titolo e l'artista, poi continua con periodo, significato, descrizione e curiosità in modo naturale e affascinante."
}`;

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: 'image/jpeg'
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text().trim();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        success: false,
        error: 'Invalid response format from AI'
      };
    }

    const analysisData = JSON.parse(jsonMatch[0]);

    return {
      success: true,
      data: analysisData
    };
  } catch (error) {
    return {
      success: false,
      error: `Analysis failed: ${error.message}`
    };
  }
}

// Fallback to serve frontend index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

export default app;
