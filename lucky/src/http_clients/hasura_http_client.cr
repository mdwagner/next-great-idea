class HasuraHttpClient
  def self.client
    url = AppConfig.settings.hasura_graphql_url
    BaseHttpClient.create(url)
  end
end
