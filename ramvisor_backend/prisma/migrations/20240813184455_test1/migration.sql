/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "yearInUniversity" INTEGER NOT NULL,
    "degreeId" INTEGER NOT NULL,
    "currentSemesterScheduleId" INTEGER,
    "gpa" DOUBLE PRECISION,
    "attendancePercentage" DOUBLE PRECISION,
    "assignmentCompletionPercentage" DOUBLE PRECISION,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "stageId" INTEGER NOT NULL,
    "classCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_schedules" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "class_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "classCode" TEXT NOT NULL,
    "courseType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "rateMyProfessorRating" DOUBLE PRECISION NOT NULL,
    "coreDegreeId" INTEGER NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degree_schedules" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "plannerId" INTEGER NOT NULL,
    "degreeId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "degree_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degrees" (
    "id" SERIAL NOT NULL,
    "numberOfCores" INTEGER NOT NULL,
    "numberOfElectives" INTEGER NOT NULL,

    CONSTRAINT "degrees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "classes_classCode_key" ON "classes"("classCode");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "degrees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedules" ADD CONSTRAINT "class_schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedules" ADD CONSTRAINT "class_schedules_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degree_schedules" ADD CONSTRAINT "degree_schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degree_schedules" ADD CONSTRAINT "degree_schedules_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "degrees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
