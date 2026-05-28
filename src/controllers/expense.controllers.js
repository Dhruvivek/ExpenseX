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
    try{
        const expenses = await Expense.find({user:req.user.userId});
        res.status(200).json(expenses);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }

}

export const updateExpense = async(req,res)=>{
  try{
    const expenseId = req.params.id;
    const {title,amount,description,category,date} = req.body;
    const expense = await Expense.findById(expenseId)
    if(!expense){
        return res.status(404).json({message: "Expense not found"});
    }
    if(expense.user.toString() != req.user.userId){
        return res.status(401).json({message: "Unauthorized"});
    }
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId,{
        title,
        amount,
        description,
        category,
        date
    },{
        new : true,
        runValidators : true
    })
    
    res.status(200).json({message: "Expense updated successfully"});
  }
  catch(error){
    console.error(error);
    res.status(500).json({messaage: "Internal server error"});
  }
}

export const deleteExpense = async(req,res) =>{
    try{
        const expenseId = req.params.id;
        const expense = await Expense.findById(expenseId);
        if(!expense){
            return res.status(404).json({message: "Expense not found"});
        }
        if(expense.user.toString() != req.user.userId){
            return res.status(401).json({message: "unauthorized"});
        }
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({message : "Expense deleted successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
}
