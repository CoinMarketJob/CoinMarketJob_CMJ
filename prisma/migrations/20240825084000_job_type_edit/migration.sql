/*
  Warnings:

  - The values [other] on the enum `Job_jobType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `jobType` ENUM('Internship', 'PartTime', 'FullTime', 'Contract', 'Temporary', 'Other') NOT NULL;
