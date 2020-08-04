require "option_parser"

class FusionAuth::DeleteTenant < LuckyCli::Task
  summary "Delete NextGreatIdea Tenant in FusionAuth"
  name "fa.delete_tenant"

  def call
    if Lucky::Env.production?
      abort "ERROR: Can't delete tenant in production!"
    end

    tenant_id = ""

    OptionParser.parse do |parser|
      parser.on("--tenant_id=TENANT_ID", "Tenant ID to delete") do |value|
        tenant_id = value
      end
    end

    response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        request.headers.delete("Accept")
        request.headers.delete("Content-Type")
      end
      client.delete("/api/tenant/#{tenant_id}")
    end

    if response.status.ok?
      puts "OK"
    else
      puts "CODE: #{response.status_code}"
      puts "BODY: #{response.body}"
      abort
    end
  end
end
