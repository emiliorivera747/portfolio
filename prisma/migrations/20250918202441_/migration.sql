/*
  Warnings:

  - You are about to drop the column `order` on the `ContentBlock` table. All the data in the column will be lost.
  - You are about to drop the column `content_block_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[media_id]` on the table `ContentBlock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content_order` to the `ContentBlock` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `content_type` on the `ContentBlock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('title', 'subtitle', 'paragraph', 'list', 'image', 'video');

-- DropForeignKey
ALTER TABLE "public"."Comments" DROP CONSTRAINT "Comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_content_block_id_fkey";

-- AlterTable
ALTER TABLE "public"."ContentBlock" DROP COLUMN "order",
ADD COLUMN     "content_order" INTEGER NOT NULL,
ADD COLUMN     "media_id" INTEGER,
DROP COLUMN "content_type",
ADD COLUMN     "content_type" "public"."ContentType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Media" DROP COLUMN "content_block_id",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "public"."Comments";

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentBlock_media_id_key" ON "public"."ContentBlock"("media_id");

-- AddForeignKey
ALTER TABLE "public"."ContentBlock" ADD CONSTRAINT "ContentBlock_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
