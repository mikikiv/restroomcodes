-- AlterTable
ALTER TABLE "BathroomCode" ADD COLUMN     "locationId" INTEGER;

-- AddForeignKey
ALTER TABLE "BathroomCode" ADD CONSTRAINT "BathroomCode_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
