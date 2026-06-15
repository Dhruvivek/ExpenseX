import express from 'express';
import connectDb from './src/config/db.js';
import dotenv from 'dotenv';
import authrouter from './src/routes/auth.routes.js';
import expenseRouter from './src/routes/expense.route.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


dotenv.config()

const app = express();
const port =process.env.PORT;


connectDb();
app.use(express.json());
app.use('/v1/auth',authrouter);
app.use('/v1/expense',expenseRouter);
app.use(helmet());


app.get('/', (req,res)=>{
    res.send("Server is started");
})

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per IP per 15 min
    message: { message: "Too many requests, please try again later" }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // stricter limit on auth routes
    message: { message: "Too many login attempts, please try again later" }
});


app.listen(port,()=>{
    console.log('Server is running');
})

app.use(limiter);
app.use('/v1/auth', authLimiter);