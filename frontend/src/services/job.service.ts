import api from "../api/axios";
import type { Job } from "../types/job";

const JOB_ENDPOINT = "/jobs";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const getJobs = async (): Promise<Job[]> => {
  const { data } = await api.get<ApiResponse<Job[]>>(JOB_ENDPOINT);
  return data.data;
};

export const getJobById = async (id: string): Promise<Job> => {
  const { data } = await api.get<ApiResponse<Job>>(`${JOB_ENDPOINT}/${id}`);
  return data.data;
};

export const createJob = async (
  job: Omit<Job, "id" | "createdAt" | "updatedAt">
): Promise<Job> => {
  const { data } = await api.post<ApiResponse<Job>>(JOB_ENDPOINT, job);
  return data.data;
};

export const updateJob = async (
  id: string,
  job: Omit<Job, "id" | "createdAt" | "updatedAt">
): Promise<Job> => {
  const { data } = await api.put<ApiResponse<Job>>(`${JOB_ENDPOINT}/${id}`, job);
  return data.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`${JOB_ENDPOINT}/${id}`);
};