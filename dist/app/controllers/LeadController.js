"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lead_service_1 = require("../../@lead-management/core-domain/lead/service/lead/lead.service");
class LeadController {
    leadService;
    constructor() {
        this.leadService = new lead_service_1.LeadService();
    }
    async index(_req, res) {
        try {
            const { page, limit, ...filter } = _req.query;
            const pagination = {
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 10,
            };
            const leads = await this.leadService.query(filter, pagination);
            res.status(200).json(leads);
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async store(_req, res) {
        try {
            const payload = _req.body;
            const result = await this.leadService.execute(payload);
            if (!result.success) {
                res.status(404).json({ message: result.message });
                return;
            }
            res.status(201).json(result);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.default = LeadController;
