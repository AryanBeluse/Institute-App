//add trainer , view trainer , add subject , view subject
import { error } from "../utils/errorHandler.js";
import Trainer from "../models/trainer.model.js";
import Subject from "../models/subject.model.js";
import bcrypt from "bcrypt"

const addTrainer = async (req, res) => {
    try {
        const { name, email, password, subjects } = req.body

        if (!name) {
            return error(400, "Name is required")
        }
        if (!email) {
            return error(400, "Email is required")
        }
        if (password.length < 8) {
            return error(400, "Password is too short")
        }
        const subjectIds = Array.isArray(subjects) ? subjects : [];

        const validSubjects = await Subject.find({ _id: { $in: subjectIds } });
        const validSubjectIds = validSubjects.map(subj => subj._id);

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const trainer = new Trainer({
            name,
            email,
            password: hashedPassword,
            subjects: validSubjectIds
        })
        await trainer.save()

        await Subject.updateMany(
            { _id: { $in: validSubjectIds } },
            { $push: { trainers: trainer._id } }
        );


        return res.status(201).json({
            success: true,
            message: "Trainer added successfully"
        })
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


const addSubject = async (req, res) => {
    try {
        const { name, description, category, status, trainers } = req.body

        if (!name) {
            return error(400, "Name is required")
        }
        if (!category || !status) {
            return error(400, "Please enter category and status")
        }
        const trainerIds = Array.isArray(trainers) ? trainers : [];

        const subject = new Subject({
            name,
            description,
            category,
            status,
            trainers: trainerIds
        })
        await subject.save()
        return res.status(201).json({
            success: true,
            message: "Subject added successfully"
        })
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


const getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find({}).select('-password')
        return res.json({ success: true, trainers })
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({})
        return res.json({ success: true, subjects })
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


const getSpecificTrainer = async (req, res) => {
    try {
        const trainerId = req.params.id
        const trainer = await Trainer.findById(trainerId)
            .populate("subjects", ["_id", "name", "email"]);
        if (!trainer) {
            return error(404, "Trainer not found")
        }
        return res.json({ success: true, trainer })
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


const getSpecificSubject = async (req, res) => {
    try {
        const subjectId = req.params.id
        const subject = await Subject.findById(subjectId)
            .populate("trainers", ["name", "_id"])
            .lean()

        if (!subject) {
            return res.status(404).json({ success: false, message: "Subject not found" });
        }

        return res.json({ success: true, subject });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};


const getTrainersBySubject = async (req, res) => {
    try {
        const subjectId = req.params.subject
        const subject = await Subject.findById(subjectId).populate("trainers")
        if (!subject) {
            return res.status(404).json({ success: false, message: "Subject not found" });
        }

        return res.json({ success: true, trainers: subject.trainers })
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


const getSubjectsByTrainer = async (req, res) => {
    try {
        const trainerId = req.params.id
        const trainer = await Trainer.findById(trainerId).populate("subjects", "_id name description category status");
        if (!trainer) {
            return res.status(404).json({ success: false, message: "Trainer not found" });
        }

        return res.json({ success: true, subjects: trainer.subjects })
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


const deleteTrainer = async (req, res) => {
    try {
        const trainerId = req.params.id

        await Subject.updateMany(
            { trainers: trainerId },
            { $pull: { trainers: trainerId } },
        )
        await Trainer.findByIdAndDelete(trainerId)
        return res.status(200).json({
            success: true,
            message: "Trainer deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


export {
    addTrainer,
    addSubject,
    getAllTrainers,
    getAllSubjects,
    getSpecificTrainer,
    getSpecificSubject,
    getTrainersBySubject,
    getSubjectsByTrainer,
    deleteTrainer,
}