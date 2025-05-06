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
