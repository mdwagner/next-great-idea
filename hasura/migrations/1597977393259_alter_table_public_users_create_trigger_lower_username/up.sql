CREATE OR REPLACE FUNCTION "public"."set_username_lower"() RETURNS TRIGGER AS $$
  BEGIN
    NEW."username" := LOWER(NEW."username");
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_username_lower" BEFORE INSERT OR UPDATE ON "public"."users"
  FOR EACH ROW EXECUTE PROCEDURE "public"."set_username_lower"();

COMMENT ON TRIGGER "set_username_lower" ON "public"."users"
  IS 'trigger to set value of column "username" to lowercase value on row insert or update';
