/*
  Warnings:

  - The values [other] on the enum `Job_jobType` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `locationType` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `salaryShow` BOOLEAN NULL,
    ADD COLUMN `salaryUnit` ENUM('Year', 'Month', 'Week', 'Day', 'Hour') NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `jobType` ENUM('Internship', 'PartTime', 'FullTime', 'Contract', 'Temporary', 'Other') NOT NULL,
    MODIFY `locationType` ENUM('Remote', 'Hybrid', 'OnSite') NOT NULL;

-- CreateTable
CREATE TABLE `JobQuestions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `jobId` INTEGER NOT NULL,
    `Questions` JSON NOT NULL,

    UNIQUE INDEX `JobQuestions_userId_jobId_key`(`userId`, `jobId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobQuestions` ADD CONSTRAINT `JobQuestions_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
