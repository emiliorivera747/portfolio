/*
  Warnings:

  - You are about to drop the column `contentBlockId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_contentBlockId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_id_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "contentBlockId";

-- AddForeignKey
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
