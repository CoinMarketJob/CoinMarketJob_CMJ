/*
  Warnings:

  - Made the column `jobDescription` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `jobDescription` JSON NOT NULL;
