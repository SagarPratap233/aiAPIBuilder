import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  integer,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  subscriptionTier: varchar('subscription_tier', { length: 50 }).default(
    'free'
  ),
  apiGenerationsUsed: integer('api_generations_used').default(0),
  apiGenerationsLimit: integer('api_generations_limit').default(5),
  createdAt: timestamp('created_at').defaultNow(),
})

export const generatedApis = pgTable('generated_apis', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  prompt: text('prompt').notNull(),
  specification: jsonb('specification').notNull(),
  generatedCode: text('generated_code'),
  deploymentUrl: varchar('deployment_url', { length: 500 }),
  repositoryUrl: varchar('repository_url', { length: 500 }),
  status: varchar('status', { length: 50 }).default('draft'),

  // New auto-deployment fields
  autoDeployed: boolean('auto_deployed').default(false),
  deploymentId: varchar('deployment_id', { length: 255 }),
  deploymentError: text('deployment_error'),
  updatedAt: timestamp('updated_at').defaultNow(),

  createdAt: timestamp('created_at').defaultNow(),
})

// Export types
export type User = typeof users.$inferSelect
export type GeneratedApi = typeof generatedApis.$inferSelect
