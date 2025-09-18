
// import fs from "fs";
// import csv from "csv-parser";
// // import pdfParse from "pdf-parse";
// import Transaction from "../models/Transaction.js";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse");
// // Get all transactions
// export const getTransactions = async (req, res) => { 
//   try {
//     const transactions = await Transaction.find();
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching transactions" });
//   }
// };

// // Add transaction manually
// export const addTransaction = async (req, res) => {
//   try {
//     const { date, description, category, amount, type } = req.body;
//     const transaction = new Transaction({ date, description, category, amount, type });
//     await transaction.save();
//     res.status(201).json(transaction);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding transaction" });
//   }
// };

// // ✅ Upload & parse CSV/PDF file
// export const uploadStatement = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const filePath = req.file.path;
//     const transactions = [];

//     if (req.file.mimetype === "text/csv" || req.file.originalname.endsWith(".csv")) {
//       // Parse CSV file
//       fs.createReadStream(filePath)
//         .pipe(csv())
//         .on("data", (row) => {
//           transactions.push({
//             description: row.Description || "Unknown",
//             amount: parseFloat(row.Amount) || 0,
//             date: new Date(row.Date) || new Date(),
//             category: row.Category || "Uncategorized",
//             type: row.Type || (parseFloat(row.Amount) >= 0 ? "income" : "expense"),
//           });
//         })
//         .on("end", async () => {
//           await Transaction.insertMany(transactions);
//           res.json({
//             message: "CSV file parsed & transactions saved",
//             count: transactions.length,
//           });
//         });

//     } else if (req.file.mimetype === "application/pdf") {
//       // Parse PDF
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdfParse(dataBuffer);

//       const lines = pdfData.text.split("\n");
//       lines.forEach((line) => {
//         if (line.match(/\d/)) {
//           transactions.push({
//             description: line.slice(0, 30),
//             amount: parseFloat(line.match(/-?\d+(\.\d+)?/)) || 0,
//             date: new Date(),
//             category: "PDF Import",
//             type: line.includes("-") ? "expense" : "income",
//           });
//         }
//       });

//       await Transaction.insertMany(transactions);
//       res.json({
//         message: "PDF file parsed & transactions saved",
//         count: transactions.length,
//       });
//     } else {
//       return res.status(400).json({ message: "Unsupported file type" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error processing file" });
//   }
// };


import fs from "fs";
import csv from "csv-parser";
import Transaction from "../models/Transaction.js";
//import pdfParse from "pdf-parse";   // ✅ Correct import
import pdfParse from "pdf-parse/lib/pdf-parse.js"; 
// Get all transactions
export const getTransactions = async (req, res) => { 
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

// Add transaction manually
export const addTransaction = async (req, res) => {
  try {
    const { date, description, category, amount, type } = req.body;
    const transaction = new Transaction({ date, description, category, amount, type });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Error adding transaction" });
  }
};

// ✅ Upload & parse CSV/PDF file
export const uploadStatement = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.path;
    const transactions = [];

    // Handle CSV upload
    if (req.file.mimetype === "text/csv" || req.file.originalname.endsWith(".csv")) {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          transactions.push({
            description: row.Description || "Unknown",
            amount: parseFloat(row.Amount) || 0,
            date: new Date(row.Date) || new Date(),
            category: row.Category || "Uncategorized",
            type: row.Type || (parseFloat(row.Amount) >= 0 ? "income" : "expense"),
          });
        })
        .on("end", async () => {
          await Transaction.insertMany(transactions);
          res.json({
            message: "CSV file parsed & transactions saved",
            count: transactions.length,
          });
        });

    // Handle PDF upload
    } else if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);

      const lines = pdfData.text.split("\n");
      lines.forEach((line) => {
        if (line.match(/\d/)) {
          transactions.push({
            description: line.slice(0, 30),
            amount: parseFloat(line.match(/-?\d+(\.\d+)?/)) || 0,
            date: new Date(),
            category: "PDF Import",
            type: line.includes("-") ? "expense" : "income",
          });
        }
      });

      await Transaction.insertMany(transactions);
      res.json({
        message: "PDF file parsed & transactions saved",
        count: transactions.length,
      });

    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }
  } catch (err) {
    console.error("Error processing file:", err);
    res.status(500).json({ message: "Error processing file" });
  }
};

