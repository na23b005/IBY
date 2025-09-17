import { GoogleGenerativeAI } from "@google/generative-ai";
import { documents } from "../data/store.js"; // contains extracted PDF texts

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory store for conversation history
let chatHistory = [];

export const chatWithBot = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    // Combine all uploaded PDF texts as context
    const pdfContext = documents.join("\n\n");

    // Construct prompt
    const prompt = `
You are a helpful assistant. Use the following documents to answer the user's question.

Documents:
${pdfContext}

User Question:
${question}
    `;

    // Push user message to history
    chatHistory.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    // Generate response from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({ contents: chatHistory });

    const answer = result.response.text();

    // Push assistant reply to history
    chatHistory.push({
      role: "model",
      parts: [{ text: answer }],
    });
    console.log(chatHistory)

    res.json({ answer, history: chatHistory });
  } catch (error) {
    console.error("❌ Chat error:", error);
    res.status(500).json({ error: error.message });
  }
};
