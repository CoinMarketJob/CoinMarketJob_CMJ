/*
  Warnings:

  - You are about to drop the column `Questions` on the `JobQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `JobQuestions` table. All the data in the column will be lost.
  - Added the required column `answers` to the `AppliedJobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questions` to the `JobQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `JobQuestions_userId_jobId_key` ON `JobQuestions`;

-- AlterTable
ALTER TABLE `AppliedJobs` ADD COLUMN `answers` JSON NOT NULL;

-- AlterTable
ALTER TABLE `JobQuestions` DROP COLUMN `Questions`,
    DROP COLUMN `userId`,
    ADD COLUMN `questions` JSON NOT NULL;
