class FusionAuth::SeedUsers < LuckyCli::Task
  summary "Seed development users in FusionAuth"
  name "fa.seed_users"

  DEFAULT_PASSWORD = "Asdf123!"

  def call
    sign_up(admin_user, true)
    users.each { |u| sign_up(u) }

    puts "OK"
  end

  def users
    [
      {
        "email"    => "john.doe@example.com",
        "username" => "john_doe",
        "password" => DEFAULT_PASSWORD,
      },
      {
        "email"    => "jane.doe@example.com",
        "username" => "jane_doe",
        "password" => DEFAULT_PASSWORD,
      },
    ]
  end

  def admin_user
    {
      "email"    => "mother.nature@example.com",
      "username" => "mother_nature",
      "password" => DEFAULT_PASSWORD,
    }
  end

  def sign_up(params, admin = false)
    avram_params = Avram::Params.new(params)
    fa_sign_up = FusionAuthSignUp.new(avram_params)

    fa_sign_up.submit(admin, false) do |operation, result|
      if !operation.status.ok?
        puts "NAME: sign up (admin)"
        puts "CODE: #{operation.status.code}"
        abort
      end
    end
  end
end
