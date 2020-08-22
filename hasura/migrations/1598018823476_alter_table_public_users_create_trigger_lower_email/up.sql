CREATE OR REPLACE FUNCTION "public"."set_email_lower"() RETURNS TRIGGER AS $$
  BEGIN
    NEW."email" := LOWER(NEW."email");
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_email_lower" BEFORE INSERT OR UPDATE ON "public"."users"
  FOR EACH ROW EXECUTE PROCEDURE "public"."set_email_lower"();

COMMENT ON TRIGGER "set_email_lower" ON "public"."users"
  IS 'trigger to set value of column "email" to lowercase value on row insert or update';
