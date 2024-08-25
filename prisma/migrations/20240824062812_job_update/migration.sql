/*
  Warnings:

  - Made the column `locationType` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `salaryShow` BOOLEAN NULL,
    ADD COLUMN `salaryUnit` ENUM('Year', 'Month', 'Week', 'Day', 'Hour') NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `locationType` ENUM('Remote', 'Hybrid', 'OnSite') NOT NULL;
