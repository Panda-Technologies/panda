/*
  Warnings:

  - Added the required column `sectionId` to the `class_schedule_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class_schedule_entries" ADD COLUMN     "sectionId" INTEGER NOT NULL;
