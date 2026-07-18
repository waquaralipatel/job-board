import { ApiResponse, PaginatedResponse } from "../types/api-response";

export const successResponse = <T>(
  message: string,
  data?: T
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const paginatedResponse = <T>(
  message: string,
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> => ({
  success: true,
  message,
  data,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  },
});

export const errorResponse = (
  message: string,
  errors?: unknown
) => ({
  success: false as const,
  message,
  errors,
});