/*
  Warnings:

  - You are about to drop the column `coreDegreeId` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `electiveDegreeId` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `currentSemesterScheduleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `degree_schedule_entries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `degree_schedules` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "degree_schedule_entries" DROP CONSTRAINT "degree_schedule_entries_classId_fkey";

-- DropForeignKey
ALTER TABLE "degree_schedule_entries" DROP CONSTRAINT "degree_schedule_entries_degreeScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "degree_schedules" DROP CONSTRAINT "degree_schedules_degreeId_fkey";

-- DropForeignKey
ALTER TABLE "degree_schedules" DROP CONSTRAINT "degree_schedules_userId_fkey";

-- AlterTable
ALTER TABLE "class_schedules" ALTER COLUMN "semesterId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "coreDegreeId",
DROP COLUMN "electiveDegreeId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "coredegreeId" INTEGER[],
ADD COLUMN     "credits" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "electivedegreeId" INTEGER[];

-- AlterTable
ALTER TABLE "degrees" ADD COLUMN     "reqCategories" TEXT[];

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "dueDate" DROP NOT NULL,
ALTER COLUMN "classCode" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "currentSemesterScheduleId",
ADD COLUMN     "currentsemesterScheduleId" INTEGER,
ADD COLUMN     "takenClassIds" INTEGER[];

-- DropTable
DROP TABLE "degree_schedule_entries";

-- DropTable
DROP TABLE "degree_schedules";

-- CreateTable
CREATE TABLE "requirements" (
    "id" SERIAL NOT NULL,
    "degreeId" INTEGER NOT NULL,
    "isElective" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "classCodes" TEXT[],

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degree_planners" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "degreeId" INTEGER NOT NULL,

    CONSTRAINT "degree_planners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semesters" (
    "id" SERIAL NOT NULL,
    "degreeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "plannerId" INTEGER NOT NULL,

    CONSTRAINT "semesters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_entries" (
    "id" SERIAL NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "semester_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requirements_id_key" ON "requirements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "degree_planners_id_key" ON "degree_planners"("id");

-- CreateIndex
CREATE UNIQUE INDEX "semesters_id_key" ON "semesters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "semester_entries_id_key" ON "semester_entries"("id");

-- AddForeignKey
ALTER TABLE "degree_planners" ADD CONSTRAINT "degree_planners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degree_planners" ADD CONSTRAINT "degree_planners_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "degrees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semesters" ADD CONSTRAINT "semesters_plannerId_fkey" FOREIGN KEY ("plannerId") REFERENCES "degree_planners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_entries" ADD CONSTRAINT "semester_entries_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_entries" ADD CONSTRAINT "semester_entries_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
