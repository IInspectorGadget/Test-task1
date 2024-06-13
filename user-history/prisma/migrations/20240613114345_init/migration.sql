/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "createUserLog" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "change" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "createUserLog_pkey" PRIMARY KEY ("id")
);
