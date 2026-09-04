"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadService = void 0;
const lead_1 = require("../../domain/entity/lead");
const lead_repository_1 = require("../../repository/lead.repository");
class LeadService {
    leadRepository;
    constructor() {
        this.leadRepository = new lead_repository_1.LeadRepository();
    }
    async execute(leadDto) {
        const resultado = lead_1.Lead.create(leadDto);
        if (!resultado.success) {
            return {
                success: false,
                message: resultado.message
            };
        }
        const existingLead = await this.leadRepository.findByEmail(resultado.value.email);
        if (existingLead) {
            return {
                success: false,
                message: "Email already exists"
            };
        }
        const lead = await this.leadRepository.create(resultado.value);
        return {
            success: true,
            message: resultado.message,
            data: lead
        };
    }
    async query(filtro, paginacao) {
        const results = await this.leadRepository.findAll(filtro, paginacao);
        return results;
    }
}
exports.LeadService = LeadService;
