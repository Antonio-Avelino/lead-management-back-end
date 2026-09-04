"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadModel = void 0;
const mongoose_1 = require("mongoose");
const lead_enum_1 = require("../../@lead-management/core-domain/lead/domain/lead.enum");
const leadSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: Object.values(lead_enum_1.LeadStatus),
        default: lead_enum_1.LeadStatus.New,
    },
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.LeadModel = (0, mongoose_1.model)("Lead", leadSchema);
