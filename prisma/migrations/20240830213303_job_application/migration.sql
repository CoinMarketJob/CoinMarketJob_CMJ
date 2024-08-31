-- CreateTable
CREATE TABLE `ApplicationsState` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `applicationId` INTEGER NOT NULL,
    `state` ENUM('Approved', 'Saved', 'Declined') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApplicationsState` ADD CONSTRAINT `ApplicationsState_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationsState` ADD CONSTRAINT `ApplicationsState_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationsState` ADD CONSTRAINT `ApplicationsState_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `AppliedJobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
