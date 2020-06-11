require "./http_client_base"

class Hasura < HttpClientBase
  def uri
    AppConfig.settings.hasura_graphql_url
  end

  def client
    create_client
  end
end
