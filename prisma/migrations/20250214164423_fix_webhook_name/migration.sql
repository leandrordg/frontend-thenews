/*
  Warnings:

  - You are about to drop the `NewsletterEngagement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NewsletterEngagement";

-- CreateTable
CREATE TABLE "WebhookData" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmChannel" TEXT,
    "referringSite" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WebhookData_email_idx" ON "WebhookData"("email");

-- CreateIndex
CREATE INDEX "WebhookData_status_idx" ON "WebhookData"("status");

-- CreateIndex
CREATE INDEX "WebhookData_createdAt_idx" ON "WebhookData"("createdAt");
