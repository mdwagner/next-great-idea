require "kemal"
require "json"
require "dotenv"
require "./app_config"
require "./utils/hasura"
require "./utils/fusion_auth"
require "./serializables/**"

# configuration
AppConfig.configure do |settings|
  Dotenv.load? unless AppConfig.test?

  settings.fusionauth_url = ENV.fetch("FUSIONAUTH_URL", "http://localhost:9011")
  settings.hasura_graphql_url = ENV.fetch("HASURA_GRAPHQL_ENDPOINT", "http://localhost:8080")
  settings.fusionauth_api_key = ENV.fetch("FUSIONAUTH_API_KEY", "bf69486b-4733-4470-a592-f1bfce7af580")
end

# lifecycle methods
before_all do |env|
  env.response.content_type = "application/json"
end

# error handlers
error 500 do |env, exception|
  env.response.respond_with_status(500)
end

error 404 do |env, exception|
  env.response.respond_with_status(404)
end

error 401 do |env, exception|
  env.response.respond_with_status(401)
end

# routes
post "/login" do |env|
  req_json = FusionAuthApi::LoginRequest.from_json(env.request.body.not_nil!).to_json
  fa_client = FusionAuth.new.client

  fa_res = fa_client.post("/api/login", body: req_json)

  if fa_res.status_code == 200
    FusionAuthApi::LoginResponse.from_json(fa_res.body.not_nil!).to_json
  else
    env.response.status_code = 401
  end
end

# runtime
Habitat.raise_if_missing_settings!
Kemal.run
