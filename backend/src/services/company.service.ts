import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";
import HttpError from "../utils/http-error";

export const createCompany = async (
  payload: Prisma.CompanyCreateInput
) => {
  return prisma.company.create({
    data: payload,
  });
};

export const getCompanies = async (
  page = 1,
  limit = 10,
  search?: string
) => {
  const skip = (page - 1) * limit;

  const where: Prisma.CompanyWhereInput = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [companies, total] = await prisma.$transaction([
    prisma.company.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            jobs: true,
          },
        },
      },
    }),
    prisma.company.count({ where }),
  ]);

  return {
    companies,
    page,
    limit,
    total,
  };
};

export const getCompanyById = async (id: string) => {
  const company = await prisma.company.findUnique({
    where: {
      id,
    },
    include: {
      jobs: {
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          jobs: true,
        },
      },
    },
  });

  if (!company) {
    throw new HttpError(404, "Company not found");
  }

  return company;
};

export const updateCompany = async (
  id: string,
  payload: Prisma.CompanyUpdateInput
) => {
  await getCompanyById(id);

  return prisma.company.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteCompany = async (id: string) => {
  await getCompanyById(id);

  await prisma.company.delete({
    where: {
      id,
    },
  });

  return {
    deleted: true,
  };
};