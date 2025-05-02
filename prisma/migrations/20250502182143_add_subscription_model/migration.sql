/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPrefsId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserPrefs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userPrefsId_fkey";

-- DropIndex
DROP INDEX "User_userPrefsId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedPassword",
DROP COLUMN "userPrefsId";

-- DropTable
DROP TABLE "UserPrefs";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN DEFAULT false,
    "subscriptionId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
