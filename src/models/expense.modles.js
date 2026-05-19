import mongoose from "mongoose";

expenseSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,   
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required : false,

    },
    date:{
        type:Date,
        required:true,
        default: Date.now
    }

})

export default mongoose.model('expense', expenseSchema);