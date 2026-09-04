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
exports.LeadRepository = void 0;
const lead_model_1 = require("../../../../app/model/lead.model");
class LeadRepository {
    create(lead) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield lead_model_1.LeadModel.create(Object.assign(Object.assign({}, lead), { status: lead.status }));
            return Object.assign({}, lead);
        });
    }
    findAll(filtro, paginacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Math.max(1, Number(paginacao === null || paginacao === void 0 ? void 0 : paginacao.page) || 1);
            const limit = Math.max(1, Number(paginacao === null || paginacao === void 0 ? void 0 : paginacao.limit) || 10);
            const skip = (page - 1) * limit;
            const [total, docs] = yield Promise.all([
                lead_model_1.LeadModel.countDocuments(filtro || {}),
                lead_model_1.LeadModel.find(filtro || {})
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
            ]);
            const totalPages = Math.ceil(total / limit) || 1;
            const data = docs.map((doc) => ({
                id: doc._id,
                name: doc.name,
                email: doc.email,
                status: doc.status,
                createdAt: doc.createdAt,
            }));
            return {
                data,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                },
            };
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield lead_model_1.LeadModel.findOne({ email: email.toLowerCase() });
            if (!doc) {
                return null;
            }
            return {
                id: doc._id.toString(),
                name: doc.name,
                email: doc.email,
                status: doc.status,
                createdAt: doc.createdAt,
            };
        });
    }
}
exports.LeadRepository = LeadRepository;
