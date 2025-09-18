/*
  Warnings:

  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
