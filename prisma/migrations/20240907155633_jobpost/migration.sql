/*
  Warnings:

  - You are about to drop the column `city` on the `Cities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Cities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Cities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cities` DROP COLUMN `city`,
    ADD COLUMN `admin1` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `lat` DOUBLE NULL,
    ADD COLUMN `lon` DOUBLE NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `pop` INTEGER NULL;

-- AlterTable
ALTER TABLE `Job` MODIFY `salaryMin` INTEGER NULL,
    MODIFY `salaryMax` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Cities_name_key` ON `Cities`(`name`);
