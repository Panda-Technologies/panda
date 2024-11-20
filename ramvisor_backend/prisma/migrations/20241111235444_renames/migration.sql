/*
  Warnings:

  - You are about to drop the column `coredegreeId` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `electivedegreeId` on the `classes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "degree_planners_id_key";

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "coredegreeId",
DROP COLUMN "electivedegreeId",
ADD COLUMN     "coreDegreeId" INTEGER[],
ADD COLUMN     "electiveDegreeId" INTEGER[],
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;
