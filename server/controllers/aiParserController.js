// import fs from "fs";
// import pdfParse from "pdf-parse";
// import { parseFinanceData } from "../utils/aiParser.js";
// export const parseFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const filePath = req.file.path;
//     const dataBuffer = fs.readFileSync(filePath);

//     // Extract text (for PDF)
//     const pdfData = await pdfParse(dataBuffer);
//     const text = pdfData.text;

//     // Send extracted text to AI
//     const transactions = await parseFinanceData(text);

//     res.json({
//       message: "File parsed successfully",
//       transactions,
//     });
//   } catch (err) {
//     console.error("Error parsing file:", err);
//     res.status(500).json({ message: "Error parsing file" });
//   }
// };


import fs from 'fs';
import path from 'path';
import pkg from 'pdf-parse';
import { parseFinanceData } from '../utils/aiParser.js';
const pdfParse = pkg.default || pkg;

export const parseFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded (field name must be "file")' });
    }

    // If multer memoryStorage used:
    if (req.file.buffer) {
      const pdfData = await pdfParse(req.file.buffer);
      const transactions = await parseFinanceData(pdfData.text);
      return res.json({ message: 'Parsed from memory', transactions });
    }

    // Disk-storage case:
    const filePath = path.resolve(req.file.path);
    // Defensive check
    if (!fs.existsSync(filePath)) {
      console.error('Expected file not found at:', filePath);
      return res.status(500).json({ message: 'Uploaded file missing from disk' });
    }

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const transactions = await parseFinanceData(pdfData.text);

    // Delete uploaded file asynchronously
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete uploaded file:', filePath, err);
    });

    res.json({ message: 'File parsed successfully', transactions });
  } catch (err) {
    console.error('Error parsing file:', err);
    res.status(500).json({ message: 'Error parsing file', error: err.message });
  }
};



