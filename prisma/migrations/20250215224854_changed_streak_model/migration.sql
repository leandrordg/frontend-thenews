/*
  Warnings:

  - The primary key for the `Streak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lastOpenedDate` on the `Streak` table. All the data in the column will be lost.
  - You are about to drop the column `streak` on the `Streak` table. All the data in the column will be lost.
  - Added the required column `streakDays` to the `Streak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streakStart` to the `Streak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Streak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Streak" DROP CONSTRAINT "Streak_pkey",
DROP COLUMN "lastOpenedDate",
DROP COLUMN "streak",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ativo',
ADD COLUMN     "streakDays" INTEGER NOT NULL,
ADD COLUMN     "streakEnd" TIMESTAMP(3),
ADD COLUMN     "streakStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Streak_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Streak_id_seq";

-- CreateIndex
CREATE INDEX "Streak_email_idx" ON "Streak"("email");

-- CreateIndex
CREATE INDEX "Streak_status_idx" ON "Streak"("status");

-- CreateIndex
CREATE INDEX "Streak_streakStart_idx" ON "Streak"("streakStart");

-- CreateIndex
CREATE INDEX "Streak_streakEnd_idx" ON "Streak"("streakEnd");
