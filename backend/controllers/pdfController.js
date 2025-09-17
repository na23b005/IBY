import { extractTextFromPDF } from "../services/pdfService.js";
import { documents } from "../data/store.js";

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Use multer's uploaded file path
    const text = await extractTextFromPDF(req.file.path);

    documents.push(text); // Store extracted text

    res.json({ message: "✅ PDF processed successfully" });
  } catch (error) {
    console.error("PDF Upload Error:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};
