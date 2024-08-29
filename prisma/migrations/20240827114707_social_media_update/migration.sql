/*
  Warnings:

  - The values [LinkedIn,GitHub] on the enum `SocialMediaCompany_socialMediaType` will be removed. If these variants are still used in the database, this will fail.
  - The values [LinkedIn,GitHub] on the enum `SocialMediaCompany_socialMediaType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `SocialMedia` ADD COLUMN `platformName` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NULL,
    MODIFY `socialMediaType` ENUM('Arena', 'Facebook', 'Figma', 'Github', 'Gitlab', 'Instagram', 'Linkedin', 'Substack', 'Telegram', 'Tiktok', 'X', 'Youtube', 'Custom') NOT NULL;

-- AlterTable
ALTER TABLE `SocialMediaCompany` ADD COLUMN `platformName` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NULL,
    MODIFY `socialMediaType` ENUM('Arena', 'Facebook', 'Figma', 'Github', 'Gitlab', 'Instagram', 'Linkedin', 'Substack', 'Telegram', 'Tiktok', 'X', 'Youtube', 'Custom') NOT NULL;
