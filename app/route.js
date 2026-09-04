"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeadController_1 = __importDefault(require("./controllers/LeadController"));
const leadRoutes = (0, express_1.Router)();
const leadController = new LeadController_1.default();
leadRoutes.get("/api/leads", leadController.index.bind(leadController));
leadRoutes.post("/api/leads", leadController.store.bind(leadController));
exports.default = leadRoutes;
