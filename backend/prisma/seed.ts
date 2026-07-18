import { PrismaClient, EmploymentType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();

  const globalco = await prisma.company.create({
    data: {
      name: "Globalco",
      logo: "https://placehold.co/100x100",
      website: "https://globalco.com",
      location: "Hyderabad, India",
    },
  });

  const techNova = await prisma.company.create({
    data: {
      name: "TechNova",
      logo: "https://placehold.co/100x100",
      website: "https://technova.com",
      location: "Bengaluru, India",
    },
  });

  const cloudSphere = await prisma.company.create({
    data: {
      name: "CloudSphere",
      logo: "https://placehold.co/100x100",
      website: "https://cloudsphere.com",
      location: "Pune, India",
    },
  });

  await prisma.job.createMany({
    data: [
      {
        title: "Software Engineer",
        description: "Develop scalable web applications using modern technologies.",
        salary: "₹10-15 LPA",
        location: "Hyderabad",
        employmentType: EmploymentType.FULL_TIME,
        experience: "0-2 Years",
        category: "Engineering",
        companyId: globalco.id,
      },
      {
        title: "Frontend Developer",
        description: "Build responsive React applications.",
        salary: "₹8-12 LPA",
        location: "Bengaluru",
        employmentType: EmploymentType.FULL_TIME,
        experience: "1-3 Years",
        category: "Frontend",
        companyId: techNova.id,
      },
      {
        title: "Backend Developer",
        description: "Design and build REST APIs with Node.js and Prisma.",
        salary: "₹9-14 LPA",
        location: "Pune",
        employmentType: EmploymentType.FULL_TIME,
        experience: "2-4 Years",
        category: "Backend",
        companyId: cloudSphere.id,
      },
    ],
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });