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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lead_service_1 = require("../../@lead-management/core-domain/lead/service/lead/lead.service");
class LeadController {
    constructor() {
        this.leadService = new lead_service_1.LeadService();
    }
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = _req.query, { page, limit } = _a, filter = __rest(_a, ["page", "limit"]);
                const pagination = {
                    page: page ? Number(page) : 1,
                    limit: limit ? Number(limit) : 10,
                };
                const leads = yield this.leadService.query(filter, pagination);
                res.status(200).json(leads);
            }
            catch (err) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    store(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = _req.body;
                const result = yield this.leadService.execute(payload);
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
        });
    }
}
exports.default = LeadController;
