import { GoogleGenerativeAI } from '@google/generative-ai';

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not configured');
    return res.status(500).json({
      success: false,
      error: 'API key not configured on server'
    });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  let imageBase64 = image;
  if (image.startsWith('data:image')) {
    imageBase64 = image.split(',')[1];
  }

  try {
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
      return res.status(400).json({
        success: false,
        error: 'Invalid response format from AI'
      });
    }

    const analysisData = JSON.parse(jsonMatch[0]);

    return res.status(200).json({
      success: true,
      data: analysisData
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: `Analysis failed: ${error.message}`,
      details: error.toString()
    });
  }
}
