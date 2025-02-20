-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userPrefsId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userPrefsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPrefsId_fkey" FOREIGN KEY ("userPrefsId") REFERENCES "UserPrefs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
