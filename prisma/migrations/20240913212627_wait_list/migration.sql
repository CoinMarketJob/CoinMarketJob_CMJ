/*
  Warnings:

  - The values [OnSite] on the enum `Job_locationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `locationType` ENUM('Remote', 'Hybrid', 'Office') NULL;

-- AlterTable
ALTER TABLE `Live` MODIFY `content` VARCHAR(65535) NOT NULL;

-- CreateTable
CREATE TABLE `WaitListUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `referenceMail` VARCHAR(191) NULL,

    UNIQUE INDEX `WaitListUsers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
