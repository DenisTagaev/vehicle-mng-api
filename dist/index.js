"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const index_1 = __importDefault(require("./routes/index"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const env = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development";
const envPath = path_1.default.resolve(process.cwd(), `.env${env === "development" ? "" : "." + env}`);
dotenv_1.default.config({ path: envPath });
const app = (0, express_1.default)();
exports.app = app;
const PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000;
app.use(express_1.default.json());
app.use("/api/vehicles", index_1.default);
// Middleware for security headers
app.use((0, helmet_1.default)());
// Middleware for request logging
app.use((0, morgan_1.default)(env === 'development' ? 'dev' : 'combined'));
// Middleware for response compression to improve performance
app.use((0, compression_1.default)());
(0, db_1.connectDB)();
const server = app.listen(PORT, () => {
    console.log(`Server running in ${env} mode on port ${PORT}`);
});
exports.server = server;
