"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configure environment
dotenv_1.default.config();
// Configure server settings
const host = "127.0.0.1";
const port = 3000;
// Configure database settings
const dbAddress = "mongodb://127.0.0.1:27017/testdb";
// Connect to database
(0, db_1.default)(dbAddress).then(() => {
    console.log(`Connected to database at ${dbAddress}`);
    // Start the server
    app_1.default.listen(port, () => {
        console.log(`Server running at http://${host}:${port}/`);
    });
}).catch((error) => {
    console.error(error);
});
// eof
