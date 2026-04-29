DO $$ BEGIN
 CREATE TYPE "public"."ContentType" AS ENUM('doc', 'image', 'video', 'iframe');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"post_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ContentBlock" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_order" integer NOT NULL,
	"content_type" "ContentType" NOT NULL,
	"content_data" json DEFAULT '{}'::json NOT NULL,
	"post_id" varchar(255) NOT NULL,
	"media_id" integer,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ContentBlock_media_id_unique" UNIQUE("media_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Media" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(500) NOT NULL,
	"media_type" varchar(50) NOT NULL,
	"description" text,
	"alt" varchar(255),
	"provider_asset_id" varchar(255),
	"storage_provider" varchar(50) DEFAULT 'CLOUDINARY' NOT NULL,
	"file_hash" varchar(64) NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Media_file_hash_unique" UNIQUE("file_hash")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PendingComment" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"post_id" varchar(255) NOT NULL,
	"verification_code" varchar(6) NOT NULL,
	"verification_expires_at" timestamp (3) with time zone NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostTag" (
	"post_id" varchar(255) NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "PostTag_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id" varchar(255) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"description" text,
	"title" varchar(255),
	"image_url" varchar(500),
	"user_id" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "Tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"user_id" varchar(255) DEFAULT gen_random_uuid() NOT NULL,
	"email_verified" boolean DEFAULT false,
	"phone_verified" boolean DEFAULT false,
	"phone" varchar(255),
	CONSTRAINT "User_email_unique" UNIQUE("email"),
	CONSTRAINT "User_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_Post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_post_id_Post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_post_id_Post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tag_id_Tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."Tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_User_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Media_provider_asset_id_idx" ON "Media" ("provider_asset_id");