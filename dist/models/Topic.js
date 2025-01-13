"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const mongoose_1 = require("mongoose");
const TopicSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, require: true },
    createdAt: { type: Date, require: true }
});
const Topic = (0, mongoose_1.model)("topic", TopicSchema);
exports.Topic = Topic;
// eof
