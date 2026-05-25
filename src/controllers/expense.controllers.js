import Expense from "../models/expense.modles.js";

export const createExpense = async(req,res) =>{
    try{
        const {title,amount,category,description,date} = req.body;
        if(!title || !amount ||!category ||!date){
            return res.status(400).json({message: "All fields are required"});
        }
        const newExpense = new Expense({
            user : req.user.userId,
            title,
            amount,
            category,
            description,
            date
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getAllExpense = async(req,res) =>{
    

}

export const updateExpense = async(req,res)=>{
  
}

export const deleteExpense = async(req,res) =>{}
