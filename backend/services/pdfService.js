import fs from "fs/promises";
import pdfParse from "pdf-parse";

export const extractTextFromPDF = async (filePath) => {
  const pdfBuffer = await fs.readFile(filePath);
  const data = await pdfParse(pdfBuffer);
   console.log(data.text)
  return data.text;
 
};
