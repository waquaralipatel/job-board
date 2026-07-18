import { z } from "zod";
import { EmploymentType } from "@prisma/client";

export const createJobSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(2, "Title must be at least 2 characters")
      .max(150, "Title must not exceed 150 characters"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters"),

    salary: z
      .string()
      .trim()
      .optional(),

    location: z
      .string()
      .trim()
      .min(2, "Location is required")
      .max(100, "Location must not exceed 100 characters"),

    employmentType: z.nativeEnum(EmploymentType),

    experience: z
      .string()
      .trim()
      .min(1, "Experience is required")
      .max(50, "Experience must not exceed 50 characters"),

    category: z
      .string()
      .trim()
      .min(2, "Category is required")
      .max(100, "Category must not exceed 100 characters"),

    companyId: z.string().cuid(),
  }),
});

export const updateJobSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(2)
      .max(150)
      .optional(),

    description: z
      .string()
      .trim()
      .min(10)
      .optional(),

    salary: z
      .string()
      .trim()
      .optional(),

    location: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    employmentType: z
      .nativeEnum(EmploymentType)
      .optional(),

    experience: z
      .string()
      .trim()
      .min(1)
      .max(50)
      .optional(),

    category: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    companyId: z
      .string()
      .cuid()
      .optional(),
  }),
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const jobIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const listJobsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().optional(),
    category: z.string().trim().optional(),
    location: z.string().trim().optional(),
    employmentType: z.nativeEnum(EmploymentType).optional(),
  }),
});