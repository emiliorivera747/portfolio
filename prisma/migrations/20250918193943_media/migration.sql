-- CreateTable
CREATE TABLE "public"."Media" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content_block_id" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_content_block_id_fkey" FOREIGN KEY ("content_block_id") REFERENCES "public"."ContentBlock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
