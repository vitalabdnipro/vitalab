import { type InferSelectModel, relations } from "drizzle-orm";
import {
  int,
  sqliteTableCreator,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `vitalab-cms_${name}`);

export const users = createTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: int({
    mode: "boolean",
  }).notNull(),
  image: text(),
  createdAt: int({
    mode: "timestamp",
  }).notNull(),
  updatedAt: int({
    mode: "timestamp",
  }).notNull(),
});

export const session = createTable("session", {
  id: text().primaryKey(),
  expiresAt: int({
    mode: "timestamp",
  }).notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => users.id),
});

export const account = createTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  expiresAt: int({
    mode: "timestamp",
  }),
  password: text(),
});

export const verification = createTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: int({
    mode: "timestamp",
  }).notNull(),
});

export const products = createTable(
  "product",
  {
    id: text().primaryKey(),
    code: text().notNull().unique(),
    title: text().notNull().default(""),
    description: text({ mode: "json" }),
    otherNames: text({ mode: "json" }),
    preparation: text({ mode: "json" }),
    biomaterial: text({ mode: "json" }),
  },
  (table) => ({
    codeIndex: uniqueIndex("code_idx").on(table.code),
  }),
);

export const productsRelations = relations(products, ({ one, many }) => ({
  relatedTests: many(relatedTests),
}));

export type Product = InferSelectModel<typeof products>;

export const relatedTests = createTable("related_test", {
  id: int({ mode: "number" }).primaryKey({ autoIncrement: true }),
  testId: text()
    .notNull()
    .references(() => products.id),
  relatedTestId: text().notNull(),
});

export const relatedTestsRelations = relations(relatedTests, ({ one }) => ({
  test: one(products, {
    fields: [relatedTests.testId],
    references: [products.id],
  }),
}));

export type RelatedTest = InferSelectModel<typeof relatedTests>;
