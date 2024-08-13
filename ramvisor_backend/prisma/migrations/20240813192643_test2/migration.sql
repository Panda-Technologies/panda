/*
  Warnings:

  - Added the required column `name` to the `degrees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "degrees" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "dueDate" SET DATA TYPE TEXT;
