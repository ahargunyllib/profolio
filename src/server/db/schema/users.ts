import {
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	role: integer().notNull().default(1), // 1: user
	password: varchar({ length: 255 }).notNull(),
	profilePictureURL: varchar("profile_picture_url", { length: 255 }),
	phoneNumber: varchar("phone_number", { length: 20 }),
	location: varchar("location", { length: 255 }),
	website: varchar("website", { length: 255 }),
	bio: text("bio"),
	currentJobTitle: varchar("current_job_title", { length: 255 }),
	currentCompany: varchar("current_company", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date()),
});
