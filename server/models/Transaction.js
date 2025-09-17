import mongoose from "mongoose";
const transactionSchema=new mongoose.Schema({
    date:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        enum:['income','expense','transfer']
    },
},{
    timestamps:true
});
export default mongoose.model('Transaction',transactionSchema)