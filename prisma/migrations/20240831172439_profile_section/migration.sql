-- AlterTable
ALTER TABLE `ProfileSection` ADD COLUMN `url` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `from` VARCHAR(191) NULL,
    MODIFY `to` VARCHAR(191) NULL,
    MODIFY `institution` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL;
