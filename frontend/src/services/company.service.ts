import api from "../api/axios";
import type { Company } from "../types/company";

const COMPANY_ENDPOINT = "/companies";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const getCompanies = async (): Promise<Company[]> => {
  const { data } = await api.get<ApiResponse<Company[]>>(COMPANY_ENDPOINT);
  return data.data;
};

export const getCompanyById = async (id: string): Promise<Company> => {
  const { data } = await api.get<ApiResponse<Company>>(
    `${COMPANY_ENDPOINT}/${id}`
  );
  return data.data;
};

export const createCompany = async (
  company: Omit<Company, "id" | "createdAt" | "updatedAt">
): Promise<Company> => {
  const { data } = await api.post<ApiResponse<Company>>(
    COMPANY_ENDPOINT,
    company
  );
  return data.data;
};

export const updateCompany = async (
  id: string,
  company: Omit<Company, "id" | "createdAt" | "updatedAt">
): Promise<Company> => {
  const { data } = await api.put<ApiResponse<Company>>(
    `${COMPANY_ENDPOINT}/${id}`,
    company
  );
  return data.data;
};

export const deleteCompany = async (id: string): Promise<void> => {
  await api.delete(`${COMPANY_ENDPOINT}/${id}`);
};