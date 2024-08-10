-- CreateTable
CREATE TABLE `Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `theme` ENUM('Light', 'Dark', 'System') NOT NULL,
    `jobAlert` BOOLEAN NOT NULL,
    `shouldKnow` BOOLEAN NOT NULL,
    `updates` BOOLEAN NOT NULL,
    `frequency` ENUM('AlmostNothing', 'Monthly', 'Weekly', 'Daily', 'PrettyMuchEverything') NOT NULL,

    UNIQUE INDEX `Settings_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
