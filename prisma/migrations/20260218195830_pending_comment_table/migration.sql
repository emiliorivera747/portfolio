-- AlterTable
ALTER TABLE "public"."Comment" DROP COLUMN "verification_code",
DROP COLUMN "verification_expires_at",
DROP COLUMN "verified";

-- CreateTable
CREATE TABLE "public"."PendingComment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "post_id" TEXT NOT NULL,
    "verification_code" TEXT NOT NULL,
    "verification_expires_at" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PendingComment_pkey" PRIMARY KEY ("id")
);
