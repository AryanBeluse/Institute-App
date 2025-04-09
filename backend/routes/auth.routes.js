import express from "express";
import {
    loginAdmin,
    loginTrainer
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/login-admin', loginAdmin)
authRouter.post('/login-trainer', loginTrainer)

export default authRouter