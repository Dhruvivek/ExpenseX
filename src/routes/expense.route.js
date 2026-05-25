import express from 'express';
const expenseRouter = express.Router();
import authMiddleware from '../middlewares/auth.middlewares.js';

import{createExpense,getAllExpense,updateExpense,deleteExpense} from '../controllers/expense.controllers.js';

expenseRouter.post('/create',authMiddleware,createExpense);

export default expenseRouter;