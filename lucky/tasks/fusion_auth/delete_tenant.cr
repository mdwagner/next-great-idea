class FusionAuth::DeleteTenant < LuckyCli::Task
  include HasuraErrorHelper

  summary "Delete NextGreatIdea Tenant, Theme, and Keys in FusionAuth"
  name "fa.delete_tenant"

  def call
    if Lucky::Env.production?
      abort "ERROR: Can't delete tenant in production!"
    end

    tenant_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        request.headers.delete("Accept")
        request.headers.delete("Content-Type")
      end
      id = AppConfig.settings.fusionauth_tenant_id
      client.delete("/api/tenant/#{id}")
    end
    error_response(tenant_response, "tenant")

    theme_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        request.headers.delete("Accept")
        request.headers.delete("Content-Type")
      end
      id = AppConfig.settings.fusionauth_theme_id
      client.delete("/api/theme/#{id}")
    end
    error_response(theme_response, "theme")

    jwt_key_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        request.headers.delete("Accept")
        request.headers.delete("Content-Type")
      end
      id = AppConfig.settings.fusionauth_jwt_key_id
      client.delete("/api/key/#{id}")
    end
    error_response(jwt_key_response, "jwt key")

    FusionAuth::DeleteEmailTemplates.new.call

    delete_hasura_response = AppHttpClient.execute(HttpClient::Hasura) do |client|
      query = <<-GRAPHQL
        mutation FusionAuthDeleteTenantTask {
          delete_users(where: {}) {
            affected_rows
          }
          delete_ideas(where: {}) {
            affected_rows
          }
        }
      GRAPHQL
      client.post("/v1/graphql", body: {"query" => query}.to_json)
    end
    hasura_error_response(delete_hasura_response) if hasura_error?(delete_hasura_response)

    puts "OK"
  end

  def error_response(response, name : String? = nil)
    if !response.status.ok?
      puts "NAME: #{name}" if name
      puts "CODE: #{response.status_code}"
      puts "BODY: #{response.body}"
      abort
    end
  end

  def hasura_error_response(response)
    puts "NAME: hasura"
    puts "BODY: #{response.body}"
    abort
  end
end
