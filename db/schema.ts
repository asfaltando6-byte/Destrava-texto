import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const purchases = sqliteTable("purchases", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  productName: text("product_name").notNull(),
  paidAt: integer("paid_at").notNull(),
  receivedAt: integer("received_at").notNull(),
});

export const activityEvents = sqliteTable("activity_events", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  kind: text("kind").notNull(),
  createdAt: integer("created_at").notNull(),
});
