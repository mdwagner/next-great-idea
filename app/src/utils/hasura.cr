require "./http_client_base"

class Hasura < HttpClientBase
  @@client = nil

  def self.open
    if client = @@client
      client
    else
      @@client = create_client("HASURA_GRAPHQL_ENDPOINT")
    end
  end
end
