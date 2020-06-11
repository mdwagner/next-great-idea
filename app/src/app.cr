require "kemal"
require "json"
require "./utils/hasura"
require "./utils/fusion_auth"

before_all do |env|
  FusionAuth.open
  Hasura.open

  env.response.content_type = "application/json"
end

after_all do |env|
  FusionAuth.close
  Hasura.close
end

post "/login" do |env|
  fa_client = FusionAuth.client!
  hasura_client = Hasura.client!

  {
    "fusionauth_host" => fa_client.host,
    "fusionauth_port" => fa_client.port,
    "hasura_host" => hasura_client.host,
    "hasura_port" => hasura_client.port
  }.to_json
end

Kemal.run
