import mongoose from "mongoose";
import {Schema} from "mongoose";
import User from "../models/user.models.js";


const expenseSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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

const Expense = mongoose.model('expense', expenseSchema);

export default Expense;