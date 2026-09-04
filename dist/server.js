"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_conection_1 = require("./app/config/db/mongoose.conection");
const route_1 = __importDefault(require("./app/route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(route_1.default);
const PORT = process.env.PORT || 3001;
async function bootstrap() {
    try {
        await (0, mongoose_conection_1.connectToDatabase)();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
}
bootstrap();
