
import { GoogleGenAI } from "@google/genai";
import { CharacterType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAvatar = async (character: CharacterType): Promise<string> => {
  const prompt = character === CharacterType.FATHER_FROST 
    ? "Cinematic digital art of Father Frost (Ded Moroz), a powerful winter wizard with a long flowing white beard, wearing an ornate deep blue fur-lined royal coat, holding a glowing crystal ice staff, standing in a heavy blizzard at the North Pole, high fantasy style, hyper-realistic ice textures, 8k."
    : "Cinematic digital art of Santa Claus, a legendary holiday warrior, wearing a majestic crimson velvet and white fur suit, holding a heavy sack of glowing golden gifts, standing in a snowy North Pole landscape at night with aurora borealis in the sky, high fantasy style, high detail, 8k.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Avatar generation failed:", error);
    return character === CharacterType.FATHER_FROST 
      ? 'https://images.unsplash.com/photo-1544273677-277914c9ad4a?auto=format&fit=crop&q=80&w=800'
      : 'https://images.unsplash.com/photo-1543589923-78e35f728335?auto=format&fit=crop&q=80&w=800';
  }
};

export const getNarrative = async (
  actor: string, 
  target: string, 
  action: string, 
  hpRemaining: number,
  lang: 'en' | 'ru'
) => {
  try {
    const languageRequest = lang === 'ru' ? "Write your response in Russian." : "Write your response in English.";
    const prompt = `You are the epic narrator of a holiday duel between ${actor} and ${target} at the North Pole.
    The action performed is: "${action}". 
    ${target} has ${hpRemaining} HP left. 
    Write a short, dramatic, 1-2 sentence holiday-themed battle description. 
    Use atmospheric winter words.
    ${languageRequest}
    Keep it lighthearted but epic.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 150
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini narration failed:", error);
    return lang === 'ru' ? "Снежная буря накрывает поле боя!" : "A blizzard covers the battlefield!";
  }
};

export const getIntroMessage = async (lang: 'en' | 'ru') => {
  try {
    const languageRequest = lang === 'ru' ? "Write in Russian." : "Write in English.";
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a 2-sentence epic introduction for 'The Battle of the North Pole' between Father Frost and Santa Claus. They fight for the legendary Bag of Gifts. ${languageRequest}`,
    });
    return response.text.trim();
  } catch (error) {
    return lang === 'ru' 
      ? "Снег оседает на Северном полюсе, когда две легенды сходятся в битве за главный приз!" 
      : "The snow settles at the North Pole as two legends face off for the ultimate prize!";
  }
};
