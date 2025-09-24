import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
const port = process.env.PORT || 3001;

app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, userImage } = req.body;
    if (!prompt || !userImage) {
      return res.status(400).send("Prompt and userImage are required.");
    }

    // Use direct API call to Gemini (matching your HTML reference approach)
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;

    // Create a detailed prompt for hairstyle transformation
    const enhancedPrompt = `Transform this person's hairstyle to: "${prompt}". 
    Make it look realistic, professional, and well-styled. Keep the same person, same face, same background, 
    but change only the hairstyle. The result should look natural and high-quality.`;

    console.log("Generating image with Gemini, prompt:", enhancedPrompt);

    const payload = {
      contents: [{
        parts: [
          { text: enhancedPrompt },
          { inlineData: { mimeType: userImage.mimeType, data: userImage.base64 } }
        ]
      }],
      generationConfig: {
        responseModalities: ['IMAGE']
      },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log("Gemini Response:", JSON.stringify(result, null, 2));
    
    const newBase64Data = result?.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;

    if (newBase64Data) {
      res.send({ image: newBase64Data });
    } else {
      throw new Error("No image data found in the API response.");
    }

  } catch (error) {
    console.error("Error in /api/generate:", error);
    if (error instanceof Error) {
      // Handle quota exceeded error specifically
      if (error.message.includes("429") || error.message.includes("quota")) {
        res.status(429).send("API quota exceeded. Please wait a moment and try again, or upgrade your plan.");
      } else {
        res.status(500).send(`An error occurred while generating content: ${error.message}`);
      }
    } else {
      res.status(500).send("An unknown error occurred while generating content.");
    }
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});