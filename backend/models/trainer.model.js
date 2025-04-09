import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }]
}, { timestamps: true });

const Trainer = mongoose.model("Trainer", TrainerSchema);

export default Trainer;