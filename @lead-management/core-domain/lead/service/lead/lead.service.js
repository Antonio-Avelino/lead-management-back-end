"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadService = void 0;
const lead_1 = require("../../domain/entity/lead");
const lead_repository_1 = require("../../repository/lead.repository");
class LeadService {
    constructor() {
        this.leadRepository = new lead_repository_1.LeadRepository();
    }
    execute(leadDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = lead_1.Lead.create(leadDto);
            if (!resultado.success) {
                return {
                    success: false,
                    message: resultado.message
                };
            }
            const existingLead = yield this.leadRepository.findByEmail(resultado.value.email);
            if (existingLead) {
                return {
                    success: false,
                    message: "Email already exists"
                };
            }
            const lead = yield this.leadRepository.create(resultado.value);
            return {
                success: true,
                message: resultado.message,
                data: lead
            };
        });
    }
    query(filtro, paginacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.leadRepository.findAll(filtro, paginacao);
            return results;
        });
    }
}
exports.LeadService = LeadService;
