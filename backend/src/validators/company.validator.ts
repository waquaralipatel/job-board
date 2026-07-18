import { z } from "zod";

export const createCompanySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name must not exceed 100 characters"),

    logo: z
      .string()
      .url("Logo must be a valid URL")
      .optional()
      .or(z.literal("")),

    website: z
      .string()
      .url("Website must be a valid URL")
      .optional()
      .or(z.literal("")),

    location: z
      .string()
      .trim()
      .min(2, "Location is required")
      .max(100, "Location must not exceed 100 characters"),
  }),
});

export const updateCompanySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    logo: z
      .string()
      .url()
      .optional()
      .or(z.literal("")),

    website: z
      .string()
      .url()
      .optional()
      .or(z.literal("")),

    location: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),
  }),
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const companyIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});