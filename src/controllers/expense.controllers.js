import Expense from "../models/expense.modles.js";
import mongoose from "mongoose";
export const createExpense = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;
        if (!title || !amount || !category || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }
        const newExpense = new Expense({
            user: req.user.userId,
            title,
            amount,
            category,
            description,
            date
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllExpense = async (req, res) => {
    try {
        const { category, from, to, sort = 'date', order = 'desc', page = 1, limit = 10 } = req.query;

        const filter = { user: req.user.userId };

        if (category) {
            filter.category = category;
        }

        if (from || to) {
            filter.date = {};
            if (from) filter.date.$gte = new Date(from);
            if (to) filter.date.$lte = new Date(to);
        }

        const sortOrder = order === 'asc' ? 1 : -1;
        const skip = (Number(page) - 1) * Number(limit);

        const [expenses, total] = await Promise.all([
            Expense.find(filter)
                .sort({ [sort]: sortOrder })
                .skip(skip)
                .limit(Number(limit)),
            Expense.countDocuments(filter)
        ]);

        res.status(200).json({
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            expenses
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { title, amount, description, category, date } = req.body;
        const expense = await Expense.findById(expenseId)
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        if (expense.user.toString() != req.user.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
            title,
            amount,
            description,
            category,
            date
        }, {
            new: true,
            runValidators: true
        })

        res.status(200).json({ message: "Expense updated successfully", expense: updatedExpense });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messaage: "Internal server error" });
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        if (expense.user.toString() != req.user.userId) {
            return res.status(401).json({ message: "unauthorized" });
        }
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSummary = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [categoryBreakdown, monthlyTotals, overall] = await Promise.all([
            // Total spent per category
            Expense.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(userId) } },
                { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
                { $sort: { total: -1 } }
            ]),

            // Total spent per month
            Expense.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(userId) } },
                {
                    $group: {
                        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                        total: { $sum: "$amount" },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { "_id.year": -1, "_id.month": -1 } }
            ]),

            // Overall total
            Expense.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
            ])
        ]);

        res.status(200).json({
            totalSpent: overall[0]?.total || 0,
            totalExpenses: overall[0]?.count || 0,
            categoryBreakdown,
            monthlyTotals
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
