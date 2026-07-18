import { Router } from "express";
import * as companyController from "../controllers/company.controller";
import validate from "../middlewares/validate";
import {
  createCompanySchema,
  updateCompanySchema,
  companyIdSchema,
} from "../validators/company.validator";

const router = Router();

router.post(
  "/",
  validate(createCompanySchema),
  companyController.createCompany
);

router.get(
  "/",
  companyController.getCompanies
);

router.get(
  "/:id",
  validate(companyIdSchema),
  companyController.getCompanyById
);

router.put(
  "/:id",
  validate(updateCompanySchema),
  companyController.updateCompany
);

router.delete(
  "/:id",
  validate(companyIdSchema),
  companyController.deleteCompany
);

export default router;