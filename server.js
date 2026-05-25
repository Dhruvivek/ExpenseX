import express from 'express';
import connectDb from './src/config/db.js';
import dotenv from 'dotenv';
import authrouter from './src/routes/auth.routes.js';
import expenseRouter from './src/routes/expense.route.js';


dotenv.config()

const app = express();
const port =process.env.PORT;

connectDb();
app.use(express.json());
app.use('/v1/auth',authrouter);
app.use('/v1/expense',expenseRouter);

app.get('/', (req,res)=>{
    res.send("Server is started");
})


app.listen(port,()=>{
    console.log('Server is running');
})