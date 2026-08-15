import { Router } from "express";
import companyRoutes from "./company.routes";
import jobRoutes from "./job.routes";

const router = Router();


//routes
router.use("/companies", companyRoutes);
router.use("/jobs", jobRoutes);

export default router;