require "http/client"
require "uri"

enum HttpClient
  FusionAuth
  Hasura

  def fusionauth?
    self == HttpClient::FusionAuth
  end

  def hasura?
    self == HttpClient::Hasura
  end
end

class AppHttpClient
  def self.execute(client_type : HttpClient)
    # get uri
    uri = (
      case client_type
      when .fusionauth?
        AppConfig.settings.fusionauth_url
      when .hasura?
        AppConfig.settings.hasura_graphql_url
      else
        ""
      end
    )

    # create client
    client = HTTP::Client.new(URI.parse(uri))

    # make any base modifications to client request
    client.before_request do |request|
      request.headers["Accept"] = "application/json"
      request.headers["Content-Type"] = "application/json"

      case client_type
      when .fusionauth?
        request.headers["Authorization"] = AppConfig.settings.fusionauth_api_key
      when .hasura?
        request.headers["X-Hasura-Admin-Secret"] = AppConfig.settings.hasura_graphql_admin_secret
      else
        nil
      end
    end

    response : HTTP::Client::Response = yield client

    # close client
    client.close

    # return client response
    response
  end
end
