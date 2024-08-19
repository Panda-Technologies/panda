/*
  Warnings:

  - You are about to drop the column `classId` on the `class_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `degree_schedules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `class_schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `classes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `degree_schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `degrees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "class_schedules" DROP CONSTRAINT "class_schedules_classId_fkey";

-- DropIndex
DROP INDEX "classes_classCode_key";

-- AlterTable
ALTER TABLE "class_schedules" DROP COLUMN "classId";

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "electiveDegreeId" INTEGER[];

-- AlterTable
ALTER TABLE "degree_schedules" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "class_schedule_entries" (
    "id" SERIAL NOT NULL,
    "classScheduleId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "class_schedule_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degree_schedule_entries" (
    "id" SERIAL NOT NULL,
    "degreeScheduleId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "degree_schedule_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_schedule_entries_id_key" ON "class_schedule_entries"("id");

-- CreateIndex
CREATE UNIQUE INDEX "degree_schedule_entries_id_key" ON "degree_schedule_entries"("id");

-- CreateIndex
CREATE UNIQUE INDEX "class_schedules_id_key" ON "class_schedules"("id");

-- CreateIndex
CREATE UNIQUE INDEX "classes_id_key" ON "classes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "degree_schedules_id_key" ON "degree_schedules"("id");

-- CreateIndex
CREATE UNIQUE INDEX "degrees_id_key" ON "degrees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_id_key" ON "tasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "class_schedule_entries" ADD CONSTRAINT "class_schedule_entries_classScheduleId_fkey" FOREIGN KEY ("classScheduleId") REFERENCES "class_schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedule_entries" ADD CONSTRAINT "class_schedule_entries_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degree_schedule_entries" ADD CONSTRAINT "degree_schedule_entries_degreeScheduleId_fkey" FOREIGN KEY ("degreeScheduleId") REFERENCES "degree_schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degree_schedule_entries" ADD CONSTRAINT "degree_schedule_entries_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
