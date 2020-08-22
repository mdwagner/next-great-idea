ALTER TABLE "public"."users" ADD COLUMN "firstname" text;
ALTER TABLE "public"."users" ALTER COLUMN "firstname" DROP NOT NULL;
