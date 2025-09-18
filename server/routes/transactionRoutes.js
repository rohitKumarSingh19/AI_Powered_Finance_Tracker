// import express from 'express';
// import {getTransactions,addTransaction} from '../controllers/transactionController.js';
// const router=express.Router();
// router.get('/',getTransactions);
// router.post('/',addTransaction);
// export default router;

import express from "express";
import multer from "multer";
import { getTransactions, addTransaction, uploadStatement } from "../controllers/transactionController.js";

const router = express.Router();

// Configure Multer (store files in 'uploads/' folder)
const upload = multer({ dest: "uploads/" });

// Routes
router.get("/", getTransactions);  // fetch all
router.post("/", addTransaction);  // add manually
router.post("/upload", upload.single("file"), uploadStatement); // upload + parse

export default router;
