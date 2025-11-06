-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "provider_asset_id" TEXT,
ADD COLUMN     "storage_provider" TEXT NOT NULL DEFAULT 'CLOUDINARY';

-- CreateIndex
CREATE INDEX "Media_provider_asset_id_idx" ON "Media"("provider_asset_id");
