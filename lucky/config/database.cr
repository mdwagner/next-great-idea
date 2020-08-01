# https://luckyframework.org/guides/database/intro-to-avram-and-orms#alternate-orms
class UnusedDatabase < Avram::Database
end

UnusedDatabase.configure do |settings|
  settings.url = "unused"
end

Avram.configure do |settings|
  settings.database_to_migrate = UnusedDatabase
end
