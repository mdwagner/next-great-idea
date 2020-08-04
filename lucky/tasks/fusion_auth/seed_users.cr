class FusionAuth::SeedUsers < LuckyCli::Task
  summary "Seed development user(s) in FusionAuth"
  name "fa.seed_users"

  def call
    only_admin = false

    OptionParser.parse do |parser|
      parser.on("--only_admin", "Seed only admin user") do
        only_admin = true
      end
    end

    if only_admin
      email = "admin@example.com"
      password = "Asdf123!"
      puts "Creating only admin user..."
      puts "Email: #{email}"
      puts "Password: #{password}"
      # Create registration for admin
    else
      puts "Creating development users..."
      # Users: admin, user(verified), user(unverified)
      # Create registration for admin
      # Create both user and registration for each user
    end

    abort "NOT_IMPLEMENTED"
  end
end
