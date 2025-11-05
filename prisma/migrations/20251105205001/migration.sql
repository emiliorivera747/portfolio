/*
  Warnings:

  - The values [title,subtitle,paragraph,list] on the enum `ContentType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `alt` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContentType_new" AS ENUM ('doc', 'image', 'video');
ALTER TABLE "ContentBlock" ALTER COLUMN "content_type" TYPE "ContentType_new" USING ("content_type"::text::"ContentType_new");
ALTER TYPE "ContentType" RENAME TO "ContentType_old";
ALTER TYPE "ContentType_new" RENAME TO "ContentType";
DROP TYPE "public"."ContentType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "alt" TEXT NOT NULL;
