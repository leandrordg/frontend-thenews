-- CreateTable
CREATE TABLE "NewsletterEngagement" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmChannel" TEXT,
    "referringSite" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterEngagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsletterEngagement_email_idx" ON "NewsletterEngagement"("email");

-- CreateIndex
CREATE INDEX "NewsletterEngagement_status_idx" ON "NewsletterEngagement"("status");

-- CreateIndex
CREATE INDEX "NewsletterEngagement_createdAt_idx" ON "NewsletterEngagement"("createdAt");
