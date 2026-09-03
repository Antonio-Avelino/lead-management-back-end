import { Request, Response } from "express";
import { LeadService } from '../../@lead-management/core-domain/lead/service/lead/lead.service';
import { LeadProps } from "../../@lead-management/core-domain/lead/domain/entity/lead";

export default class LeadController  {
    private leadService: LeadService;

    constructor() {
        this.leadService = new LeadService();
    }


    async index(_req: Request, res: Response): Promise<void> {
        try {
            const { page, limit, ...filter } = _req.query;
    
            const pagination = {
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 10,
            };
    
            const leads = await this.leadService.query(filter, pagination);
            res.status(200).json(leads);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async store(_req: Request, res: Response): Promise<void> {
        try {
            const payload = _req.body as LeadProps; 
            const result = await this.leadService.execute(payload);

            if (!result.success) {
                res.status(404).json({ message: result.message });
                return;
            }
            res.status(201).json(result);
        } catch (err) {

            console.log(err)
            res.status(500).json({ message: "Internal server error" });
        }
    }

}
