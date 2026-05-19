import express from 'express';
const authrouter = express.Router();
import {register} from '../controllers/register.controllers.js';
import {login} from "../controllers/login.controllers.js";
authrouter.route('/register').post(register);
authrouter.route('/login').post(login);
export default authrouter;