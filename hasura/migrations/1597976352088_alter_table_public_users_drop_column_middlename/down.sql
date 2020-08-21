ALTER TABLE "public"."users" ADD COLUMN "middlename" text;
ALTER TABLE "public"."users" ALTER COLUMN "middlename" DROP NOT NULL;
