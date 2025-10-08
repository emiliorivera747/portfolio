/*
  Warnings:

  - The `content_data` column on the `ContentBlock` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updated_at` to the `ContentBlock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContentBlock" ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
DROP COLUMN "content_data",
ADD COLUMN     "content_data" JSONB NOT NULL DEFAULT '{}';
