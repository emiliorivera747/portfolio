import {
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  json,
  serial,
  pgEnum,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// Enums
export const contentTypeEnum = pgEnum("ContentType", ["doc", "image", "video", "iframe"]);

// User table
export const users = pgTable("User", {
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .unique()
    .default(sql`gen_random_uuid()`),
  emailVerified: boolean("email_verified").default(false),
  phoneVerified: boolean("phone_verified").default(false),
  phone: varchar("phone", { length: 255 }),
});

// Post table
export const posts = pgTable("Post", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  description: text("description"),
  title: varchar("title", { length: 255 }),
  imageUrl: varchar("image_url", { length: 500 }),
  userId: varchar("user_id", { length: 255 }).references(() => users.userId),
});

// ContentBlock table
export const contentBlocks = pgTable("ContentBlock", {
  id: serial("id").primaryKey(),
  contentOrder: integer("content_order").notNull(),
  contentType: contentTypeEnum("content_type").notNull(),
  contentData: json("content_data").notNull().default({}),
  postId: varchar("post_id", { length: 255 })
    .notNull()
    .references(() => posts.id),
  mediaId: integer("media_id").unique(),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
});

// Media table
export const media = pgTable(
  "Media",
  {
    id: serial("id").primaryKey(),
    url: varchar("url", { length: 500 }).notNull(),
    mediaType: varchar("media_type", { length: 50 }).notNull(),
    description: text("description"),
    alt: varchar("alt", { length: 255 }),
    providerAssetId: varchar("provider_asset_id", { length: 255 }),
    storageProvider: varchar("storage_provider", { length: 50 })
      .notNull()
      .default("CLOUDINARY"),
    fileHash: varchar("file_hash", { length: 64 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    providerAssetIdIdx: index("Media_provider_asset_id_idx").on(
      table.providerAssetId
    ),
  })
);

// Comment table
export const comments = pgTable("Comment", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  postId: varchar("post_id", { length: 255 })
    .notNull()
    .references(() => posts.id),
});

// PendingComment table
export const pendingComments = pgTable("PendingComment", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  postId: varchar("post_id", { length: 255 }).notNull(),
  verificationCode: varchar("verification_code", { length: 6 }).notNull(),
  verificationExpiresAt: timestamp("verification_expires_at", {
    withTimezone: true,
    precision: 3,
  }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
});

// Tag table
export const tags = pgTable("Tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

// PostTag join table
export const postTags = pgTable(
  "PostTag",
  {
    postId: varchar("post_id", { length: 255 })
      .notNull()
      .references(() => posts.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
  })
);

// Relations (for query builder)
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.userId],
  }),
  contentBlocks: many(contentBlocks),
  comments: many(comments),
  postTags: many(postTags),
}));

export const contentBlocksRelations = relations(contentBlocks, ({ one }) => ({
  post: one(posts, {
    fields: [contentBlocks.postId],
    references: [posts.id],
  }),
  media: one(media, {
    fields: [contentBlocks.mediaId],
    references: [media.id],
  }),
}));

export const mediaRelations = relations(media, ({ one }) => ({
  contentBlock: one(contentBlocks, {
    fields: [media.id],
    references: [contentBlocks.mediaId],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type NewContentBlock = typeof contentBlocks.$inferInsert;
export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
export type PendingComment = typeof pendingComments.$inferSelect;
export type NewPendingComment = typeof pendingComments.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
export type PostTag = typeof postTags.$inferSelect;
export type NewPostTag = typeof postTags.$inferInsert;
