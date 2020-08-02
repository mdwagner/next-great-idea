class FusionAuthLogin < Avram::Operation
  include StatusHelper

  param_key :input

  attribute loginId : String
  attribute password : String

  def submit
    fa_response = AppHttpClient.execute(AppHttpClient::FusionAuth) do |client|
      client.post("/api/login", body: login_body)
    end

    if fa_response.status.ok? && fa_response.body?
      yield self, login_response(fa_response.body)
    else
      yield self, login_error_response
    end
  end

  private def login_body
    {
      "applicationId" => AppConfig.settings.fusionauth_app_id,
      "loginId"       => loginId.value,
      "password"      => password.value,
    }.to_json
  end

  private def login_response(json_str)
    json = JSON.parse(json_str)
    {
      "token"    => json["token"],
      "id"       => json["user"]["id"],
      "active"   => json["user"]["active"],
      "data"     => json["user"]["data"],
      "email"    => json["user"]["email"],
      "timezone" => json["user"]["timezone"],
      "username" => json["user"]["username"],
      "verified" => json["user"]["verified"],
    }
  end

  private def login_error_response
    @status = HTTP::Status::UNAUTHORIZED
    ErrorSerializer.new(message: @status.description.not_nil!)
  end
end
