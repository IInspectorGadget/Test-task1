/*
  Warnings:

  - You are about to drop the `createUserLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "createUserLog";

-- CreateTable
CREATE TABLE "UserLog" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "change" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLog_pkey" PRIMARY KEY ("id")
);
