/*
  Warnings:

  - You are about to drop the `Hacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attachmentType` to the `Attachments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Attachments` ADD COLUMN `attachmentType` ENUM('Image', 'File') NOT NULL;

-- DropTable
DROP TABLE `Hacks`;

-- DropTable
DROP TABLE `News`;
