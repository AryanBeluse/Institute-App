import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
    addTrainer,
    addSubject,
    getAllTrainers,
    getAllSubjects,
    getSpecificTrainer,
    getSpecificSubject,
    getTrainersBySubject,
    deleteTrainer
} from "../controllers/admin.controller.js";



const adminRouter = express.Router();

adminRouter.post('/trainer', authAdmin, addTrainer)
adminRouter.get('/trainer', authAdmin, getAllTrainers)
adminRouter.delete('/trainer/:id', authAdmin, deleteTrainer)
adminRouter.get('/trainer/:id', authAdmin, getSpecificTrainer)
adminRouter.get('/trainer/:subject/topic', authAdmin, getTrainersBySubject);

adminRouter.post('/subject', authAdmin, addSubject)
adminRouter.get('/subject', authAdmin, getAllSubjects)
adminRouter.get('/subject/:id', authAdmin, getSpecificSubject)

export default adminRouter