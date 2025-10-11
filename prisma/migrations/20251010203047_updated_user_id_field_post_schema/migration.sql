-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_user_id_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
