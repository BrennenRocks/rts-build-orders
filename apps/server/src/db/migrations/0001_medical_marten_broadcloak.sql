CREATE TABLE "build_order_steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"build_order_id" integer NOT NULL,
	"game_time" integer NOT NULL,
	"description" text NOT NULL,
	"sort_order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "build_orders_to_opponent_factions" (
	"build_order_id" integer NOT NULL,
	"faction_id" integer NOT NULL,
	CONSTRAINT "build_orders_to_opponent_factions_build_order_id_faction_id_pk" PRIMARY KEY("build_order_id","faction_id")
);
--> statement-breakpoint
CREATE TABLE "build_orders_to_tags" (
	"build_order_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "build_orders_to_tags_build_order_id_tag_id_pk" PRIMARY KEY("build_order_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "build_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" text NOT NULL,
	"user_id" text NOT NULL,
	"game_id" integer NOT NULL,
	"faction_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"video_url" text,
	"patch_version" text,
	"visibility" text DEFAULT 'public' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"favorites_count" integer DEFAULT 0 NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "build_orders_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "factions" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"user_id" text NOT NULL,
	"build_order_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "favorites_user_id_build_order_id_pk" PRIMARY KEY("user_id","build_order_id")
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "games_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "step_resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"step_id" integer NOT NULL,
	"resource_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"color_variant" text DEFAULT 'default' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "build_order_steps" ADD CONSTRAINT "build_order_steps_build_order_id_build_orders_id_fk" FOREIGN KEY ("build_order_id") REFERENCES "public"."build_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "build_orders_to_opponent_factions" ADD CONSTRAINT "build_orders_to_opponent_factions_build_order_id_build_orders_id_fk" FOREIGN KEY ("build_order_id") REFERENCES "public"."build_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "build_orders_to_opponent_factions" ADD CONSTRAINT "build_orders_to_opponent_factions_faction_id_factions_id_fk" FOREIGN KEY ("faction_id") REFERENCES "public"."factions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "build_orders_to_tags" ADD CONSTRAINT "build_orders_to_tags_build_order_id_build_orders_id_fk" FOREIGN KEY ("build_order_id") REFERENCES "public"."build_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "build_orders_to_tags" ADD CONSTRAINT "build_orders_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "build_orders" ADD CONSTRAINT "build_orders_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "build_orders" ADD CONSTRAINT "build_orders_faction_id_factions_id_fk" FOREIGN KEY ("faction_id") REFERENCES "public"."factions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "factions" ADD CONSTRAINT "factions_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_build_order_id_build_orders_id_fk" FOREIGN KEY ("build_order_id") REFERENCES "public"."build_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "step_resources" ADD CONSTRAINT "step_resources_step_id_build_order_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."build_order_steps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "step_resources" ADD CONSTRAINT "step_resources_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "steps_build_order_idx" ON "build_order_steps" USING btree ("build_order_id");--> statement-breakpoint
CREATE INDEX "steps_build_order_sort_idx" ON "build_order_steps" USING btree ("build_order_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "steps_build_order_sort_unique" ON "build_order_steps" USING btree ("build_order_id","sort_order");--> statement-breakpoint
CREATE INDEX "bo_to_opp_build_order_idx" ON "build_orders_to_opponent_factions" USING btree ("build_order_id");--> statement-breakpoint
CREATE INDEX "bo_to_opp_faction_idx" ON "build_orders_to_opponent_factions" USING btree ("faction_id");--> statement-breakpoint
CREATE INDEX "bo_to_tags_build_order_idx" ON "build_orders_to_tags" USING btree ("build_order_id");--> statement-breakpoint
CREATE INDEX "bo_to_tags_tag_idx" ON "build_orders_to_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "build_orders_game_idx" ON "build_orders" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "build_orders_faction_idx" ON "build_orders" USING btree ("faction_id");--> statement-breakpoint
CREATE INDEX "build_orders_user_idx" ON "build_orders" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "build_orders_game_faction_idx" ON "build_orders" USING btree ("game_id","faction_id");--> statement-breakpoint
CREATE INDEX "factions_game_idx" ON "factions" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "factions_slug_idx" ON "factions" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "factions_name_idx" ON "factions" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "factions_game_slug_unique" ON "factions" USING btree ("game_id","slug");--> statement-breakpoint
CREATE INDEX "favorites_user_idx" ON "favorites" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "favorites_build_order_idx" ON "favorites" USING btree ("build_order_id");--> statement-breakpoint
CREATE INDEX "games_slug_idx" ON "games" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "games_name_idx" ON "games" USING btree ("name");--> statement-breakpoint
CREATE INDEX "resources_game_idx" ON "resources" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "resources_slug_idx" ON "resources" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "resources_name_idx" ON "resources" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "resources_game_slug_unique" ON "resources" USING btree ("game_id","slug");--> statement-breakpoint
CREATE INDEX "step_resources_step_idx" ON "step_resources" USING btree ("step_id");--> statement-breakpoint
CREATE INDEX "step_resources_resource_idx" ON "step_resources" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "tags_game_idx" ON "tags" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "tags_name_idx" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_game_slug_unique" ON "tags" USING btree ("game_id","slug");
