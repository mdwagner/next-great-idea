class AppConfig
  Habitat.create do
    setting fusionauth_url : String
    setting fusionauth_api_key : String
    setting hasura_graphql_url : String
    setting fusionauth_app_id : String
  end
end
