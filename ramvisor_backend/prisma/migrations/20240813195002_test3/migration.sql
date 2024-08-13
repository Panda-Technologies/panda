-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_degreeId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "university" DROP NOT NULL,
ALTER COLUMN "yearInUniversity" DROP NOT NULL,
ALTER COLUMN "degreeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "degrees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
