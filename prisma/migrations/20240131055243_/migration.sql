/*
  Warnings:

  - You are about to drop the column `zipCode` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "zipCode",
ADD COLUMN     "zipcode" TEXT;
