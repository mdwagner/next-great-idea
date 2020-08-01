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
      yield self, FusionAuthLoginSerializer.new(fa_response.body)
    else
      @status = HTTP::Status::UNAUTHORIZED
      yield self, ErrorSerializer.new(message: @status.description.not_nil!)
    end
  end

  private def login_body
    {
      "applicationId" => AppConfig.settings.fusionauth_app_id,
      "loginId"       => loginId.value,
      "password"      => password.value,
    }.to_json
  end
end
