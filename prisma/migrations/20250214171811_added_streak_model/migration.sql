-- CreateTable
CREATE TABLE "Streak" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "streak" INTEGER NOT NULL,
    "lastOpenedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Streak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streak_email_key" ON "Streak"("email");
