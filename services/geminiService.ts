
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API functionality will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function getSareeStylingAdvice(product: Product): Promise<string> {
  if (!API_KEY) {
    return Promise.resolve("The AI Stylist is currently unavailable. Please check the API key configuration.");
  }

  const prompt = `
    You are a world-class fashion expert specializing in Indian ethnic wear, particularly sarees.
    A user is looking at a saree and wants styling advice.

    Saree Name: "${product.name}"
    Saree Description: "${product.description}"

    Provide elegant and helpful styling advice. Structure your response in three short paragraphs:
    1.  **Occasions:** Suggest 2-3 specific occasions where this saree would be a perfect fit.
    2.  **Jewelry Pairing:** Recommend the type of jewelry (e.g., Kundan, temple jewelry, minimalist gold) that would complement the saree. Be specific about earrings, necklaces, and bangles if possible.
    3.  **Complete the Look:** Suggest hairstyle, footwear, and a type of handbag or clutch to complete the ensemble.

    Keep the tone sophisticated, inspiring, and concise. Do not use markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching styling advice from Gemini API:", error);
    return "I'm sorry, I couldn't come up with styling advice at the moment. Please try again later.";
  }
}
