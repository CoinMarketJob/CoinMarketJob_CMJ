/*
  Warnings:

  - You are about to drop the column `coverLetterDraft` on the `AppliedJobs` table. All the data in the column will be lost.
  - You are about to drop the column `coverLetterLink` on the `AppliedJobs` table. All the data in the column will be lost.
  - You are about to drop the column `visaSponsorship` on the `AppliedJobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AppliedJobs` DROP COLUMN `coverLetterDraft`,
    DROP COLUMN `coverLetterLink`,
    DROP COLUMN `visaSponsorship`;

-- AlterTable
ALTER TABLE `Live` MODIFY `content` VARCHAR(65535) NOT NULL;
