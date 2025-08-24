ALTER TABLE "build_orders" DROP COLUMN "uuid";--> statement-breakpoint
ALTER TABLE "build_orders" ADD COLUMN "uuid" uuid NOT NULL DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "game_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "build_orders" ADD CONSTRAINT "build_orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;