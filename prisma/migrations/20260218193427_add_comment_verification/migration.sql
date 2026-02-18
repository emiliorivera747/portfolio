-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "name" TEXT,
ADD COLUMN     "verification_code" TEXT,
ADD COLUMN     "verification_expires_at" TIMESTAMPTZ(3),
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
