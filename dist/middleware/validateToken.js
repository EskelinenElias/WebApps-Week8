"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = authenticateUser;
exports.authenticateAdmin = authenticateAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateUser(req, res, next) {
    // Check token
    const token = req.header('authorization')?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access denied, missing token" });
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Access denied, missing token" });
    }
}
function authenticateAdmin(req, res, next) {
    authenticateUser(req, res, () => {
        if (!req.user || !req.user.isAdmin) {
            res.status(403).json({ message: "Access denied." });
            return;
        }
        next();
    });
}
