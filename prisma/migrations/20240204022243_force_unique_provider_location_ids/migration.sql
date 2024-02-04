/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_providerId_key" ON "Location"("providerId");
