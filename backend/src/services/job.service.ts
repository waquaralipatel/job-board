import { EmploymentType, Prisma } from "@prisma/client";
import prisma from "../prisma/client";
import HttpError from "../utils/http-error";

export const createJob = async (payload: Prisma.JobCreateInput) => {
  const company = await prisma.company.findUnique({
    where: {
      id: payload.company.connect?.id,
    },
  });

  if (!company) {
    throw new HttpError(404, "Company not found");
  }

  return prisma.job.create({
    data: payload,
    include: {
      company: true,
    },
  });
};

export const getJobs = async (
   page = 1,
  limit = 10,
  filters?: {
    search?: string;
    category?: string;
    location?: string;
    employmentType?: EmploymentType;
  }
) => {
  const skip = (page - 1) * limit;

  const where: Prisma.JobWhereInput = {
    ...(filters?.search && {
      OR: [
        {
          title: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
      ],
    }),
    ...(filters?.category && {
      category: filters.category,
    }),
    ...(filters?.location && {
      location: {
        contains: filters.location,
        mode: "insensitive",
      },
    }),
    ...(filters?.employmentType && {
      employmentType: filters.employmentType,
    }),
  };

  const [jobs, total] = await prisma.$transaction([
    prisma.job.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        company: true,
      },
    }),
    prisma.job.count({
      where,
    }),
  ]);

  return {
    jobs,
    page,
    limit,
    total,
  };
};

export const getJobById = async (id: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
    },
  });

  if (!job) {
    throw new HttpError(404, "Job not found");
  }

  return job;
};

export const updateJob = async (
  id: string,
  payload: Prisma.JobUpdateInput
) => {
  await getJobById(id);

  if (payload.company?.connect?.id) {
    const company = await prisma.company.findUnique({
      where: {
        id: payload.company.connect.id,
      },
    });

    if (!company) {
      throw new HttpError(404, "Company not found");
    }
  }

  return prisma.job.update({
    where: {
      id,
    },
    data: payload,
    include: {
      company: true,
    },
  });
};

export const deleteJob = async (id: string) => {
  await getJobById(id);

  await prisma.job.delete({
    where: {
      id,
    },
  });

  return {
    deleted: true,
  };
};