import jwt from "jsonwebtoken";
import { error } from "../utils/errorHandler.js";

const authTrainer = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return error(401, "Not authorized, token missing or invalid");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return error(401, "Token missing");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.empId = decoded.id;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
};

export default authTrainer;
