import express from "express";
import authTrainer from "../middleware/authTrainer.js";
import {
    getSubjectsByTrainer,
    getSpecificSubject
} from "../controllers/admin.controller.js";

const trainerRouter = express.Router();

trainerRouter.get('/:id/subjects', authTrainer, getSubjectsByTrainer)
trainerRouter.get('/subject/:id', authTrainer, getSpecificSubject)

export default trainerRouter