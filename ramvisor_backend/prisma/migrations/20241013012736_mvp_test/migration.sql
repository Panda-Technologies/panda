/*
  Warnings:

  - You are about to drop the column `reqCategories` on the `degrees` table. All the data in the column will be lost.
  - You are about to drop the column `classCodes` on the `requirements` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `semester_entries` table. All the data in the column will be lost.
  - You are about to drop the column `currentsemesterScheduleId` on the `users` table. All the data in the column will be lost.
  - Added the required column `title` to the `degree_planners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPremium` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "degree_planners" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "degrees" DROP COLUMN "reqCategories",
ADD COLUMN     "coreCategories" TEXT[],
ADD COLUMN     "electiveCategories" TEXT[];

-- AlterTable
ALTER TABLE "requirements" DROP COLUMN "classCodes",
ADD COLUMN     "classIds" INTEGER[];

-- AlterTable
ALTER TABLE "semester_entries" DROP COLUMN "index";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "currentsemesterScheduleId",
ADD COLUMN     "graduationSemesterName" TEXT,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL;
