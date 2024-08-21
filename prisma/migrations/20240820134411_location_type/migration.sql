-- AlterTable
ALTER TABLE `Job` ADD COLUMN `locationType` ENUM('Remote', 'Hybrid', 'OnSite') NULL;
