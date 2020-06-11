require "kemal"
require "json"
require "dotenv"
require "./app_config"
require "./utils/hasura"
require "./utils/fusion_auth"

AppConfig.configure do |settings|
  Dotenv.load? unless AppConfig.test?

  settings.fusionauth_url = ENV.fetch("FUSIONAUTH_URL", "http://localhost:9011")
  settings.hasura_graphql_url = ENV.fetch("HASURA_GRAPHQL_ENDPOINT", "http://localhost:8080")
end

before_all do |env|
  env.response.content_type = "application/json"
end

post "/login" do |env|
  fa_client = FusionAuth.client
  hasura_client = Hasura.client

  {
    "fusionauth_host" => fa_client.host,
    "fusionauth_port" => fa_client.port,
    "hasura_host"     => hasura_client.host,
    "hasura_port"     => hasura_client.port,
  }.to_json
end

Habitat.raise_if_missing_settings!
Kemal.run
