/*
  Warnings:

  - You are about to drop the column `visaSponsorship` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Job` DROP COLUMN `visaSponsorship`,
    MODIFY `logo` VARCHAR(191) NULL,
    MODIFY `companyName` VARCHAR(191) NULL,
    MODIFY `locationType` ENUM('Remote', 'Hybrid', 'OnSite') NULL,
    MODIFY `jobType` ENUM('Internship', 'PartTime', 'FullTime', 'Contract', 'Temporary', 'Other') NULL,
    MODIFY `experienceLevel` ENUM('EntryLevel', 'Junior', 'MidLevel', 'Senior', 'Lead', 'Manager', 'Executive') NULL,
    MODIFY `educationalDegree` ENUM('HighSchool', 'University', 'Master', 'PhD') NULL,
    MODIFY `jobDescription` JSON NULL;

-- AlterTable
ALTER TABLE `Live` MODIFY `content` VARCHAR(65535) NOT NULL;
