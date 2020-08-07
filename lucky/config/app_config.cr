class AppConfig
  Habitat.create do
    setting fusionauth_url : String
    setting fusionauth_api_key : String
    setting fusionauth_tenant_id : String
    setting fusionauth_app_id : String
    setting fusionauth_theme_id : String
    setting fusionauth_jwt_key_id : String

    setting hasura_graphql_url : String
    setting hasura_graphql_admin_secret : String

    setting git_commit : String

    setting email_host : String
    setting email_port : String
    setting issuer : String
    setting app_name : String

    setting jwt_kid : String
    setting jwt_secret : String
  end
end

AppConfig.configure do |settings|
  settings.fusionauth_url = ENV.fetch("FUSIONAUTH_URL", "http://fusionauth:9011")
  settings.fusionauth_api_key = ENV.fetch("FUSIONAUTH_API_KEY", "bf69486b-4733-4470-a592-f1bfce7af580")
  settings.fusionauth_tenant_id = ENV.fetch("FUSIONAUTH_TENANT_ID", "ec02c5c8-d4ef-440e-b5ff-5f3b4fe51b48")
  settings.fusionauth_app_id = ENV.fetch("FUSIONAUTH_APP_ID", "85a03867-dccf-4882-adde-1a79aeec50df")
  settings.fusionauth_theme_id = ENV.fetch("FUSIONAUTH_THEME_ID", "d2c5b616-cdb7-4abb-97cc-4465a29f313f")
  settings.fusionauth_jwt_key_id = ENV.fetch("FUSIONAUTH_JWT_KEY_ID", "29c14b28-fe3a-4db5-a49c-3fd30b5e4bce")

  settings.hasura_graphql_url = ENV.fetch("HASURA_GRAPHQL_ENDPOINT", "http://hasura:8080")
  settings.hasura_graphql_admin_secret = ENV.fetch("HASURA_GRAPHQL_ADMIN_SECRET", "secret")

  git_commit = `git rev-parse HEAD`.strip
  settings.git_commit = ENV.fetch("GIT_COMMIT", git_commit)

  settings.email_host = ENV.fetch("EMAIL_HOST", "localhost")
  settings.email_port = ENV.fetch("EMAIL_PORT", "3001")
  settings.issuer = ENV.fetch("APP_ISSUER", "http://example.com")
  settings.app_name = ENV.fetch("APP_NAME", "NextGreatIdea")

  settings.jwt_kid = ENV.fetch("JWT_KID", "QTccbJfA2iI8rNHwUGYWdiNgrN-ueQOK")
  settings.jwt_secret = ENV.fetch("JWT_SECRET", "secret")
end
