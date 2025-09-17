import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Health check
router.get("/", (req, res) => {
  res.send("API is working");
});

// 🔹 Chat endpoint (Text only)
router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const resp = await fetch(
      `${process.env.GEMINI_API_URL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      return res.status(resp.status).json({ error: data });
    }

    res.json(data);
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🔹 File upload endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const base64Data = fileBuffer.toString("base64");

    const resp = await fetch(
      `${process.env.GEMINI_API_URL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: "Please analyze this file:" },
                {
                  inline_data: {
                    mime_type: req.file.mimetype,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ error: text });
    }

    const data = await resp.json();
    fs.unlinkSync(req.file.path); // cleanup
    res.json(data);
  } catch (err) {
    console.error("Upload API error:", err);
    res.status(500).json({ error: String(err) });
  }
});

export default router;
