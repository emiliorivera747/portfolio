-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "email_verified" BOOLEAN DEFAULT false,
    "phone_verified" BOOLEAN DEFAULT false,
    "phone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "public"."User"("user_id");
