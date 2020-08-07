class FusionAuth::CreateTenant < LuckyCli::Task
  summary "Create NextGreatIdea Tenant, Theme, and Keys in FusionAuth"
  name "fa.create_tenant"

  def call
    # JWT KEYS
    jwt_key_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      id = AppConfig.settings.fusionauth_jwt_key_id
      client.post("/api/key/import/#{id}", body: jwt_key_json)
    end
    error_response(jwt_key_response, "jwt keys")

    # THEME
    clone_default_theme

    # TENANT
    tenant_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      id = AppConfig.settings.fusionauth_tenant_id
      client.post("/api/tenant/#{id}", body: tenant_json)
    end
    error_response(tenant_response, "tenant")

    puts "OK"
  end

  def error_response(response, name : String? = nil)
    if !response.status.ok?
      puts "NAME: #{name}" if name
      puts "CODE: #{response.status_code}"
      puts "BODY: #{response.body}"
      abort
    end
  end

  def clone_default_theme
    themes_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        request.headers.delete("Accept")
        request.headers.delete("Content-Type")
      end
      client.get("/api/theme")
    end
    error_response(themes_response, "themes")

    themes_json = JSON.parse(themes_response.body)

    themes = themes_json["themes"].as_a
    theme = themes.find { |t| t["name"].as_s? == "FusionAuth" }
    if theme.nil?
      puts "DEFAULT THEME NOT FOUND"
      abort
    end
    default_theme_id = theme["id"].as_s

    theme_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      id = AppConfig.settings.fusionauth_theme_id
      client.post("/api/theme/#{id}", body: theme_json(default_theme_id))
    end
    error_response(theme_response, "theme")
  end

  def tenant_json
    email_host = AppConfig.settings.email_host
    email_port = AppConfig.settings.email_port.to_i
    theme_id = AppConfig.settings.fusionauth_theme_id
    issuer = AppConfig.settings.issuer
    tenant_name = AppConfig.settings.app_name
    jwt_key_id = AppConfig.settings.fusionauth_jwt_key_id

    {
      "tenant" => {
        "emailConfiguration" => {
          "host" => email_host,
          "port" => email_port,
        },
        "externalIdentifierConfiguration" => {
          "authorizationGrantIdTimeToLiveInSeconds" => 30,
          "changePasswordIdGenerator" => {
            "length" => 32,
            "type" => "randomBytes",
          },
          "changePasswordIdTimeToLiveInSeconds" => 600,
          "deviceCodeTimeToLiveInSeconds" => 1_800,
          "deviceUserCodeIdGenerator" => {
            "length" => 6,
            "type" => "randomAlphaNumeric",
          },
          "emailVerificationIdGenerator" => {
            "length" => 32,
            "type" => "randomBytes",
          },
          "emailVerificationIdTimeToLiveInSeconds" => 86_400,
          "externalAuthenticationIdTimeToLiveInSeconds" => 300,
          "oneTimePasswordTimeToLiveInSeconds" => 60,
          "passwordlessLoginGenerator" => {
            "length" => 32,
            "type" => "randomBytes",
          },
          "passwordlessLoginTimeToLiveInSeconds" => 180,
          "registrationVerificationIdGenerator" => {
            "length" => 32,
            "type" => "randomBytes",
          },
          "registrationVerificationIdTimeToLiveInSeconds" => 86_400,
          "setupPasswordIdGenerator" => {
            "length" => 32,
            "type" => "randomBytes",
          },
          "setupPasswordIdTimeToLiveInSeconds" => 86_400,
          "twoFactorIdTimeToLiveInSeconds" => 300,
          "twoFactorTrustIdTimeToLiveInSeconds" => 2_592_000,
        },
        "failedAuthenticationConfiguration" => {
          "actionDuration" => 3,
          "actionDurationUnit" => "MINUTES",
          "resetCountInSeconds" => 60,
          "tooManyAttempts" => 5,
        },
        "issuer" => issuer,
        "jwtConfiguration" => {
          "accessTokenKeyId" => jwt_key_id,
          "enabled" => true,
          "idTokenKeyId" => jwt_key_id,
          "refreshTokenExpirationPolicy" => "Fixed",
          "refreshTokenRevocationPolicy" => {
            "onLoginPrevented" => true,
            "onPasswordChanged" => true,
          },
          "refreshTokenTimeToLiveInMinutes" => 43_200,
          "refreshTokenUsagePolicy" => "Reusable",
          "timeToLiveInSeconds" => 3_600,
        },
        "logoutURL" => "#{issuer}/logout",
        "name" => tenant_name,
        "passwordValidationRules" => {
          "maxLength" => 256,
          "minLength" => 8,
        },
        "themeId": theme_id,
      }
    }.to_json
  end

  def theme_json(default_theme_id)
    theme_name = AppConfig.settings.app_name

    {
      "sourceThemeId" => default_theme_id,
      "theme" => {
        "name" => "#{theme_name} Theme"
      },
    }.to_json
  end

  def jwt_key_json
    jwt_kid = AppConfig.settings.jwt_kid
    secret = AppConfig.settings.jwt_secret

    {
      "key" => {
        "algorithm" => "HS256",
        "kid" => jwt_kid,
        "name" => "SHA-256 with HMAC (access and id tokens)",
        "secret" => secret,
        "type" => "HMAC",
      }
    }.to_json
  end
end
