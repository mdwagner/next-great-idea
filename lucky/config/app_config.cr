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
  settings.fusionauth_url = Lucky::Env.fetch!("FUSIONAUTH_URL", "http://fusionauth:9011")
  settings.fusionauth_api_key = Lucky::Env.fetch!("FUSIONAUTH_API_KEY", "bf69486b-4733-4470-a592-f1bfce7af580")
  settings.fusionauth_tenant_id = Lucky::Env.fetch!("FUSIONAUTH_TENANT_ID", "ec02c5c8-d4ef-440e-b5ff-5f3b4fe51b48")
  settings.fusionauth_app_id = Lucky::Env.fetch!("FUSIONAUTH_APP_ID", "85a03867-dccf-4882-adde-1a79aeec50df")
  settings.fusionauth_theme_id = Lucky::Env.fetch!("FUSIONAUTH_THEME_ID", "d2c5b616-cdb7-4abb-97cc-4465a29f313f")
  settings.fusionauth_jwt_key_id = Lucky::Env.fetch!("FUSIONAUTH_JWT_KEY_ID", "29c14b28-fe3a-4db5-a49c-3fd30b5e4bce")

  settings.hasura_graphql_url = Lucky::Env.fetch!("HASURA_GRAPHQL_ENDPOINT", "http://hasura:8080")
  settings.hasura_graphql_admin_secret = Lucky::Env.fetch!("HASURA_GRAPHQL_ADMIN_SECRET", "secret")

  settings.git_commit = Lucky::Env.fetch!("GIT_COMMIT", ->{ `git rev-parse HEAD`.strip })

  settings.email_host = Lucky::Env.fetch!("EMAIL_HOST", "mailhog")
  settings.email_port = Lucky::Env.fetch!("EMAIL_PORT", "1025")
  settings.issuer = Lucky::Env.fetch!("APP_ISSUER", "http://example.com")
  settings.app_name = Lucky::Env.fetch!("APP_NAME", "NextGreatIdea")

  settings.jwt_kid = Lucky::Env.fetch!("JWT_KID", "QTccbJfA2iI8rNHwUGYWdiNgrN-ueQOK")
  settings.jwt_secret = Lucky::Env.fetch!("JWT_SECRET", "secret")
end
