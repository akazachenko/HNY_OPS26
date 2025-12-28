
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables as a named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNewYearWish = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Напиши очень краткое (максимум 7-10 слов), невероятно теплое, душевное и искреннее новогоднее пожелание для коллеги. Оно должно быть уютным и личным, без официоза.",
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    // Accessing the .text property directly as per Gemini API guidelines.
    return response.text?.trim() || "Пусть этот год согреет ваше сердце радостью и теплом!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Тепла, уюта и самых светлых моментов в новом году!";
  }
};
