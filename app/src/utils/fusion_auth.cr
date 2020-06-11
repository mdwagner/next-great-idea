require "./http_client_base"

class FusionAuth < HttpClientBase
  @@client = nil

  def self.open
    if client = @@client
      client
    else
      @@client = create_client("FUSIONAUTH_URL")
    end
  end
end
