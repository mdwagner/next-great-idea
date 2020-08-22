class FusionAuth::CreateApp < LuckyCli::Task
  summary "Create NextGreatIdea Application in FusionAuth"
  name "fa.create_app"

  def call
    response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        tenant_id = AppConfig.settings.fusionauth_tenant_id
        request.headers["X-FusionAuth-TenantId"] = tenant_id
      end
      id = AppConfig.settings.fusionauth_app_id
      client.post("/api/application/#{id}", body: app_json)
    end
    error_response(response, "application")

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

  def app_json
    app_name = AppConfig.settings.app_name

    {
      "application" => {
        "name"  => app_name,
        "roles" => [
          {
            "name"        => "admin",
            "isDefault"   => false,
            "isSuperRole" => true,
          },
          {
            "name"        => "user",
            "isDefault"   => true,
            "isSuperRole" => false,
          },
        ],
      },
    }.to_json
  end
end
