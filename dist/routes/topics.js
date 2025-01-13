"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const validateToken_1 = require("../middleware/validateToken");
const Topic_1 = require("../models/Topic");
const router = (0, express_1.Router)();
// GET route to fetch all topics
router.get("/topics", async (req, res) => {
    try {
        // Fetch topics from the database
        const topics = await User_1.User.findOne({}, { password: 0 });
        res.status(200).json({ topics: topics });
        return;
    }
    catch (error) {
        console.error(`Error fetching topics: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
// POST route to add new topic
router.post("/topic", 
// Authentication as user
validateToken_1.authenticateUser, 
// Function to add new topic
async (req, res) => {
    // Parse request
    if (!req.user) {
        res.status(400).json({ message: "Access denied: missing token" });
        return;
    }
    const { title, content } = req.body;
    const username = req.user.username;
    try {
        // Create a new topic
        const newTopic = await Topic_1.Topic.create({ title, content, username });
        res.status(201).json(newTopic);
    }
    catch (error) {
        // Error occurred
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});
// DELETE route to delete a topic as an admin
router.delete("/topic/:id", 
// Authenticate as admin
validateToken_1.authenticateAdmin, 
// Function to delete a topic as an admin
async (req, res) => {
    // Parse request
    const { id } = req.params;
    try {
        // Find topic by id and delete it
        const topic = await Topic_1.Topic.findByIdAndDelete(id);
        if (!topic) {
            // Topic not found
            res.status(404).json({ message: "Topic not found." });
            return;
        }
        // Topic deleted
        res.status(200).json({ message: "Topic deleted successfully." });
    }
    catch (error) {
        // Error occurred
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.default = router;
// eof
