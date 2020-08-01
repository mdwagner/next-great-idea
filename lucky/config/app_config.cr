class AppConfig
  Habitat.create do
    setting fusionauth_url : String
    setting fusionauth_api_key : String
    setting fusionauth_app_id : String
    setting hasura_graphql_url : String
    setting hasura_graphql_admin_secret : String
  end
end

AppConfig.configure do |settings|
  settings.fusionauth_url = ENV.fetch("FUSIONAUTH_URL", "http://fusionauth:9011")
  settings.fusionauth_api_key = ENV.fetch("FUSIONAUTH_API_KEY", "bf69486b-4733-4470-a592-f1bfce7af580")
  settings.fusionauth_app_id = ENV.fetch("FUSIONAUTH_APP_ID", "85a03867-dccf-4882-adde-1a79aeec50df")
  settings.hasura_graphql_url = ENV.fetch("HASURA_GRAPHQL_ENDPOINT", "http://hasura:8080")
  settings.hasura_graphql_admin_secret = ENV.fetch("HASURA_GRAPHQL_ADMIN_SECRET", "secret")
end
