-- CreateTable
CREATE TABLE "public"."ContentBlock" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "content_type" TEXT NOT NULL,
    "content_data" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ContentBlock" ADD CONSTRAINT "ContentBlock_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
