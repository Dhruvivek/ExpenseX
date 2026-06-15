import express from 'express';
const expenseRouter = express.Router();
import authMiddleware from '../middlewares/auth.middlewares.js';

import{createExpense,getAllExpense,updateExpense,deleteExpense,getSummary} from '../controllers/expense.controllers.js';

expenseRouter.post('/create',authMiddleware,createExpense);
expenseRouter.delete('/delete/:id',authMiddleware,deleteExpense);
expenseRouter.patch('/update/:id',authMiddleware,updateExpense);
expenseRouter.get('/getAll',authMiddleware,getAllExpense);
expenseRouter.get('/summary', authMiddleware, getSummary);

export default expenseRouter;