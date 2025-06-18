CREATE TABLE "generated_apis" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"prompt" text NOT NULL,
	"specification" jsonb NOT NULL,
	"generated_code" text,
	"deployment_url" varchar(500),
	"repository_url" varchar(500),
	"status" varchar(50) DEFAULT 'draft',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"subscription_tier" varchar(50) DEFAULT 'free',
	"api_generations_used" integer DEFAULT 0,
	"api_generations_limit" integer DEFAULT 5,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "generated_apis" ADD CONSTRAINT "generated_apis_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;