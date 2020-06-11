require "./http_client_base"

class FusionAuth < HttpClientBase
  def self.uri
    AppConfig.settings.fusionauth_url
  end
end
