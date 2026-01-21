import { GoogleGenAI } from "@google/genai";

// Initialize the SDK with your API Key from .env.local
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const model = ai.models.get("gemini-2.5-flash");

// This is the blueprint for the portfolio data
export const portfolioSchema = {
  type: "object",
  properties: {
    fullName: { type: "string" },
    bio: { type: "string" },
    skills: { type: "array", items: { type: "string" } },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
      },
    },
  },
  required: ["fullName", "bio", "skills"],
};