/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userPrefsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthdate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPrefsId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthdate" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "pastProjectLinks" TEXT[],
ADD COLUMN     "profession" TEXT,
ADD COLUMN     "skillLevel" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userPrefsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserPrefs" (
    "id" TEXT NOT NULL,
    "networkPrefs" TEXT[],
    "conversationPrefs" TEXT[],
    "prefersEmailMarketing" BOOLEAN NOT NULL DEFAULT true,
    "allowsLocation" BOOLEAN NOT NULL DEFAULT false,
    "agreesToPrivacyPolicy" BOOLEAN NOT NULL DEFAULT false,
    "agreesToTerms" BOOLEAN NOT NULL DEFAULT false,
    "showGithubUrl" BOOLEAN NOT NULL DEFAULT true,
    "showProfile" BOOLEAN NOT NULL DEFAULT true,
    "galleryPermissions" BOOLEAN NOT NULL,
    "hardwarePermissions" BOOLEAN NOT NULL,
    "agreesToCOPPARegulations" BOOLEAN NOT NULL,

    CONSTRAINT "UserPrefs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userPrefsId_key" ON "User"("userPrefsId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPrefsId_fkey" FOREIGN KEY ("userPrefsId") REFERENCES "UserPrefs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
