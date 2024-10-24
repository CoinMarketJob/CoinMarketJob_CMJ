/*
  Warnings:

  - You are about to drop the column `jobTitle` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `siteUrl` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `jobTitle`,
    DROP COLUMN `location`,
    DROP COLUMN `siteUrl`;
