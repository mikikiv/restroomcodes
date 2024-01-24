/*
  Warnings:

  - Made the column `code` on table `BathroomCode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BathroomCode" ADD COLUMN     "valid" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "code" SET NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
