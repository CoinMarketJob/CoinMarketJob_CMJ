-- AlterTable
ALTER TABLE `Job` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `JobQuestions` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Live` MODIFY `content` VARCHAR(65535) NOT NULL;
