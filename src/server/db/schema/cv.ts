import {
	integer,
	json,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const cvsTable = pgTable("cvs", {
	id: uuid("id").primaryKey(),
	userId: uuid("user_id")
		.notNull()
		.references(() => usersTable.id, {
			onDelete: "cascade",
		}),
	jobName: varchar("job_name").notNull(),
	atsScore: integer("ats_score").notNull().default(0),
	status: integer().notNull().default(1), // 1: draft, 2: needs review, 3: completed
	suggestions: json().notNull(),
	data: json().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date()),
});
