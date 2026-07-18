import { EmploymentType } from "@prisma/client";
import { Request, Response } from "express";
import * as jobService from "../services/job.service";
import asyncHandler from "../utils/async-handler";
import {
  paginatedResponse,
  successResponse,
} from "../utils/api-response";

export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    company: {
      connect: {
        id: req.body.companyId,
      },
    },
  };

  delete payload.companyId;

  const job = await jobService.createJob(payload);

  res.status(201).json(
    successResponse("Job created successfully", job)
  );
});

export const getJobs = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  const filters = {
    search:
      typeof req.query.search === "string"
        ? req.query.search
        : undefined,

    category:
      typeof req.query.category === "string"
        ? req.query.category
        : undefined,

    location:
      typeof req.query.location === "string"
        ? req.query.location
        : undefined,

    employmentType:
      typeof req.query.employmentType === "string" &&
      Object.values(EmploymentType).includes(
        req.query.employmentType as EmploymentType
      )
        ? (req.query.employmentType as EmploymentType)
        : undefined,
  };

  const result = await jobService.getJobs(page, limit, filters);

  res.json(
    paginatedResponse(
      "Jobs fetched successfully",
      result.jobs,
      result.page,
      result.limit,
      result.total
    )
  );
});

export const getJobById = asyncHandler(async (req: Request, res: Response) => {
  const job = await jobService.getJobById(req.params.id as string);

  res.json(
    successResponse("Job fetched successfully", job)
  );
});

export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
  };

  if (payload.companyId) {
    payload.company = {
      connect: {
        id: payload.companyId,
      },
    };

    delete payload.companyId;
  }

  const job = await jobService.updateJob(
    req.params.id as string,
    payload
  );

  res.json(
    successResponse("Job updated successfully", job)
  );
});

export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  await jobService.deleteJob(req.params.id as string);

  res.json(
    successResponse("Job deleted successfully")
  );
});