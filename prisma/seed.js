const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

// Load jobs data from JSON file
const jobsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'jobs.json'), 'utf-8'));

async function main() {
  for (const job of jobsData) {
    await prisma.job.create({
      data: {
        jobTitle: job.jobTitle,
        location: job.location,
        locationType: job.locationType,
        jobType: job.jobType,
        experienceLevel: job.experienceLevel,
        educationalDegree: job.educationalDegree,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryShow: job.salaryShow,
        salaryUnit: job.salaryUnit,
        jobDescription: job.jobDescription,
        logo: job.logo,                // Add this line to include the logo
        companyName: job.companyName   // Add this line to include the company name
      },
    });
  }
}

main()
  .then(async () => {
    console.log('Seeding complete!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
