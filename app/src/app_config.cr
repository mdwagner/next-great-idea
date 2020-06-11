require "habitat"

class AppConfig
  Habitat.create do
    setting fusionauth_url : String
    setting hasura_graphql_url : String
  end

  {% for type in ["production", "development", "test"] %}
    def self.{{type.id}}?
      (Kemal.config.env || "").downcase == {{type.id.stringify}}
    end
  {% end %}
end
