/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `professor` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `rateMyProfessorRating` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `classes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "dayOfWeek",
DROP COLUMN "endTime",
DROP COLUMN "professor",
DROP COLUMN "rateMyProfessorRating",
DROP COLUMN "startTime";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "questionnaireCompleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "class_sections" (
    "id" SERIAL NOT NULL,
    "classId" INTEGER NOT NULL,
    "section" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "rateMyProfessorRating" DOUBLE PRECISION NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "userId" TEXT[],

    CONSTRAINT "class_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_classSectionTouser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "class_sections_id_key" ON "class_sections"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_classSectionTouser_AB_unique" ON "_classSectionTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_classSectionTouser_B_index" ON "_classSectionTouser"("B");

-- AddForeignKey
ALTER TABLE "class_sections" ADD CONSTRAINT "class_sections_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classSectionTouser" ADD CONSTRAINT "_classSectionTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "class_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classSectionTouser" ADD CONSTRAINT "_classSectionTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
