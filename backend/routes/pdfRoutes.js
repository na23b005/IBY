import express from "express";
import { upload } from "../middleware/upload.js";
import { uploadPDF } from "../controllers/pdfController.js";

const router = express.Router();
router.post("/upload", upload.single("file"), uploadPDF);

export default router;
