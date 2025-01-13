"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const topics_1 = __importDefault(require("./topics"));
// Create router
const router = (0, express_1.Router)();
// Add routes
router.use("/api/user", users_1.default);
router.use("/api", topics_1.default);
exports.default = router;
// eof
