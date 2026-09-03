import { Router } from "express";
import LeadController from "./controllers/LeadController";
const leadRoutes = Router();
const leadController = new LeadController();

leadRoutes.get("/api/leads", leadController.index.bind(leadController));

leadRoutes.post("/api/leads", leadController.store.bind(leadController));

export default leadRoutes;