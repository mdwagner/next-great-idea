require "dotenv"
require "kemal"
require "json"

Dotenv.load?

before_all do |env|
  env.response.content_type = "application/json"
end

post "/login" do |env|
  {success: true}.to_json
end

Kemal.run
