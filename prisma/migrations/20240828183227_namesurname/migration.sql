/*
  Warnings:

  - Added the required column `nameSurname` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `nameSurname` VARCHAR(191) NOT NULL;
