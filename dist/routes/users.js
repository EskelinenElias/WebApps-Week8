"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// POST route to register an user
router.post("/register", async (req, res) => {
    try {
        // Check if a user with the given username or email already exists in the database
        const existingUser = await User_1.User.findOne({ $or: [
                { username: req.body.username },
                { email: req.body.email }
            ] });
        if (existingUser) {
            if (existingUser.username === req.body.username) {
                res.status(403).json({ username: `User with username '${req.body.username}' already exists.` });
                return;
            }
            if (existingUser.email === req.body.email) {
                res.status(403).json({ username: `User with email '${req.body.email}' already exists.` });
                return;
            }
        }
        // Hash the password
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        // Create new user
        const newUser = await User_1.User.create({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            isAdmin: req.body.isAdmin
        });
        res.status(200).json(newUser);
        return;
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
// GET route to list reqistered users
router.get("/list", async (req, res) => {
    try {
        // Fetch users from the database
        const users = await User_1.User.findOne({}, { password: 0 });
        res.status(200).json({ users: users });
        return;
    }
    catch (error) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
// POST route to login 
router.post("/login", async (req, res) => {
    try {
        // Check if user is registered in the database
        const user = await User_1.User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Check if the password is correct
        const correctPassword = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (!correctPassword) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ _id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.SECRET, { expiresIn: "1h" });
        // Respond with the token
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal server error." });
    }
});
exports.default = router;
// eof
