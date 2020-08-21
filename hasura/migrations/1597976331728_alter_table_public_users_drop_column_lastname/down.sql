ALTER TABLE "public"."users" ADD COLUMN "lastname" text;
ALTER TABLE "public"."users" ALTER COLUMN "lastname" DROP NOT NULL;
