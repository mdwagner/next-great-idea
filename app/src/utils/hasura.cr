require "./http_client_base"

class Hasura < HttpClientBase
  def self.uri
    AppConfig.settings.hasura_graphql_url
  end
end
