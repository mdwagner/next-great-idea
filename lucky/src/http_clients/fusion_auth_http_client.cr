class FusionAuthHttpClient
  def self.client
    url = AppConfig.settings.fusionauth_url
    http_client = BaseHttpClient.create(url)
    http_client.before_request do |request|
      api_key = AppConfig.settings.fusionauth_api_key
      request.headers["Authorization"] = api_key
    end
    http_client
  end
end
