import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
//import aiParserRoutes from './routes/aiParserRoutes.js';
dotenv.config();
connectDB();

const app = express();

app.use(cors(
//   {
//   origin: "*", // or your frontend URL
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"],
// }
));
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

// Routes
app.use("/api/transactions", transactionRoutes);
//app.use("/api/ai", aiParserRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
