"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRepository = void 0;
const lead_model_1 = require("../../../../app/model/lead.model");
class LeadRepository {
    async create(lead) {
        const doc = await lead_model_1.LeadModel.create({
            ...lead,
            status: lead.status,
        });
        return {
            ...lead
        };
    }
    async findAll(filtro, paginacao) {
        const page = Math.max(1, Number(paginacao?.page) || 1);
        const limit = Math.max(1, Number(paginacao?.limit) || 10);
        const skip = (page - 1) * limit;
        const [total, docs] = await Promise.all([
            lead_model_1.LeadModel.countDocuments(filtro || {}),
            lead_model_1.LeadModel.find(filtro || {})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
        ]);
        const totalPages = Math.ceil(total / limit) || 1;
        const data = docs.map((doc) => ({
            id: doc._id.toString(),
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
    }
    async findByEmail(email) {
        const doc = await lead_model_1.LeadModel.findOne({ email: email.toLowerCase() });
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
    }
}
exports.LeadRepository = LeadRepository;
