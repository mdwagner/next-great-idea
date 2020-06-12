class FusionAuthHttpClient < BaseHttpClient
  def uri
    AppConfig.settings.fusionauth_url
  end

  def client
    c = create_client
    c.before_request do |request|
      request.headers["Authorization"] = AppConfig.settings.fusionauth_api_key
    end
    c
  end
end
