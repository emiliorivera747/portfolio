/*
  Warnings:

  - A unique constraint covering the columns `[file_hash]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_hash` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Media" ADD COLUMN     "file_hash" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Media_file_hash_key" ON "public"."Media"("file_hash");
