/*
  Warnings:

  - You are about to drop the column `email` on the `Streak` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Streak` table. All the data in the column will be lost.
  - You are about to drop the column `streakDays` on the `Streak` table. All the data in the column will be lost.
  - You are about to drop the column `streakEnd` on the `Streak` table. All the data in the column will be lost.
  - You are about to drop the column `streakStart` on the `Streak` table. All the data in the column will be lost.
  - You are about to drop the `WebhookData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `count` to the `Streak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastDate` to the `Streak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Streak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Streak` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Streak_email_idx";

-- DropIndex
DROP INDEX "Streak_email_key";

-- DropIndex
DROP INDEX "Streak_status_idx";

-- DropIndex
DROP INDEX "Streak_streakEnd_idx";

-- DropIndex
DROP INDEX "Streak_streakStart_idx";

-- AlterTable
ALTER TABLE "Streak" DROP COLUMN "email",
DROP COLUMN "status",
DROP COLUMN "streakDays",
DROP COLUMN "streakEnd",
DROP COLUMN "streakStart",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "lastDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "WebhookData";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engagement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Streak" ADD CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
