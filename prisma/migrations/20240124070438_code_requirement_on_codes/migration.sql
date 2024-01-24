-- AlterTable
ALTER TABLE "BathroomCode" ADD COLUMN     "codeRequired" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "code" DROP NOT NULL;
