class Database < Avram::Database
end

Avram.configure do |settings|
  settings.database_to_migrate = Database
end

Database.configure do |settings|
  settings.url = ""
end
