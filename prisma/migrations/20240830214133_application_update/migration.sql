/*
  Warnings:

  - A unique constraint covering the columns `[userId,applicationId]` on the table `ApplicationsState` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ApplicationsState_userId_applicationId_key` ON `ApplicationsState`(`userId`, `applicationId`);
