class FusionAuthLogin < Avram::Operation
  param_key :input

  attribute loginId : String
  attribute password : String

  property status : HTTP::Status = HTTP::Status::OK

  def submit
    fa_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.post("/api/login", body: login_body)
    end

    raise FusionAuthLoginException.new if !fa_response.status.ok?

    yield self, login_response(fa_response.body)
  rescue FusionAuthLoginException
    result = HasuraErrorSerializer.new(status: HTTP::Status::UNAUTHORIZED)
    @status = result.response_status
    yield self, result
  end

  private def login_body
    {
      "applicationId" => AppConfig.settings.fusionauth_app_id,
      "loginId"       => loginId.value,
      "password"      => password.value,
    }.to_json
  end

  private def login_response(str)
    json = JSON.parse(str)
    {
      "token"    => json["token"].as_s,
      "id"       => json["user"]["id"].as_s,
      "active"   => json["user"]["active"].as_bool,
      "data"     => json["user"]["data"],
      "email"    => json["user"]["email"].as_s,
      "timezone" => json["user"]["timezone"].as_s?,
      "username" => json["user"]["username"].as_s?,
      "verified" => json["user"]["verified"].as_bool,
    }
  end

  class FusionAuthLoginException < Exception
  end
end
