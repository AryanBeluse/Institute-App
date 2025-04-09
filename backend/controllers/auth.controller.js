import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { error } from "../utils/errorHandler.js";
import Trainer from "../models/trainer.model.js";

const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const aToken = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, aToken })
        } else {
            next(error(400, 'Invalid Credentials'));
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const loginTrainer = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("Received login for:", email);

        const trainer = await Trainer.findOne({ email: email });
        if (!trainer) {

            return next(error(400, 'Invalid Email'));
        }

        const isMatch = await bcrypt.compare(password, trainer.password);
        if (isMatch) {
            const empToken = jwt.sign({ id: trainer._id }, process.env.JWT_SECRET);

            res.json({
                success: true,
                empToken,
                trainer: {
                    _id: trainer._id,
                    name: trainer.name,
                    email: trainer.email,
                }
            });
        } else {
            res.json({ success: false, message: "Invalid Password" });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export {
    loginAdmin,
    loginTrainer,
}