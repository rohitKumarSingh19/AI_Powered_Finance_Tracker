import Transaction from "../models/Transaction.js";
//Get All transactions
export const getTransactions=async(req,res)=>{
    const transactions=await Transaction.find();
    res.json(transactions)
};

//Add transaction

export const addTransaction=async(req,res)=>{
    const {date,description,category,amount,type}=req.body;
    const transaction=new Transaction({date,description,category,amount,type});
    await transaction.save();
    res.status(201).json(transaction);
}