import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Science", "Mathematics", "Programming", "Language", "Other"],
        default: "Other"
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer"
    }],
}, { timestamps: true });

const Subject = mongoose.model("Subject", SubjectSchema);

export default Subject;




