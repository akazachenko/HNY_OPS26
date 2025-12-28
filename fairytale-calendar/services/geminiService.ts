
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Initialize GoogleGenAI using the process.env.API_KEY exclusively.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateMonthImage(prompt: string): Promise<string | null> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `${prompt} The image should look like a high-quality oil painting in the style of Russian lacquer miniature and Viktor Vasnetsov, focusing on fairy tale characters and epic landscapes with ornate borders.` }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      // Iterate through candidates and parts to find the image data.
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to generate image:", error);
      return null;
    }
  }

  async generateCoverImage(): Promise<string | null> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: "An epic Russian fairy tale illustration in the style of Vasnetsov and Palekh miniature. A young man and a girl in traditional folk clothing standing in a magical winter forest with flowers blooming under the snow. Intricate details, vibrant colors, magical atmosphere, lacquer box art style." }]
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      // Find the image part in the response.
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to generate cover image:", error);
      return null;
    }
  }
}

export const geminiService = new GeminiService();
