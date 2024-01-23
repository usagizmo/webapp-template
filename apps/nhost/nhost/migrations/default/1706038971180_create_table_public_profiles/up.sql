CREATE TABLE "public"."profiles" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "bio" text NOT NULL DEFAULT ''::text, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE restrict ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
