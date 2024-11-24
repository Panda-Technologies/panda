/*
  Warnings:

  - Changed the type of `section` on the `class_sections` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "class_sections" DROP COLUMN "section",
ADD COLUMN     "section" INTEGER NOT NULL;
