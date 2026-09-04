"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017/lead-management";
    await mongoose_1.default.connect(uri);
    console.log("MongoDB connected");
}
exports.connectToDatabase = connectToDatabase;
