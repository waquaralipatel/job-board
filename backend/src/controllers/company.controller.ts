import { Request, Response } from "express";
import * as companyService from "../services/company.service";
import asyncHandler from "../utils/async-handler";
import {
  paginatedResponse,
  successResponse,
} from "../utils/api-response";

export const createCompany = asyncHandler(async (req: Request, res: Response) => {
  const company = await companyService.createCompany(req.body);

  res.status(201).json(
    successResponse("Company created successfully", company)
  );
});

export const getCompanies = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const search =
    typeof req.query.search === "string"
      ? req.query.search
      : undefined;

  const result = await companyService.getCompanies(page, limit, search);

  res.json(
    paginatedResponse(
      "Companies fetched successfully",
      result.companies,
      result.page,
      result.limit,
      result.total
    )
  );
});

export const getCompanyById = asyncHandler(async (req: Request, res: Response) => {
  const company = await companyService.getCompanyById(req.params.id as string);

  res.json(
    successResponse("Company fetched successfully", company)
  );
});

export const updateCompany = asyncHandler(async (req: Request, res: Response) => {
  const company = await companyService.updateCompany(
    req.params.id as string,
    req.body
  );

  res.json(
    successResponse("Company updated successfully", company)
  );
});

export const deleteCompany = asyncHandler(async (req: Request, res: Response) => {
  await companyService.deleteCompany(req.params.id as string);

  res.json(
    successResponse("Company deleted successfully")
  );
});