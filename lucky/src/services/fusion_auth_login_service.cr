class FusionAuthLoginService
  def initialize(@type : FusionAuthLoginType)
  end

  def call : Tuple(Int32, BaseSerializer)
    fa_response = AppHttpClient.execute(AppHttpClient::FusionAuth) do |client|
      client.post("/api/login", body: login_body)
    end

    if fa_response.status_code == 200 && fa_response.body?
      {200, FusionAuthLoginSerializer.new(fa_response.body)}
    else
      status = HTTP::Status::UNAUTHORIZED
      message = status.description.not_nil!
      code = status.code
      {code, ErrorSerializer.new(message: message)}
    end
  end

  private def login_body
    {
      "applicationId" => AppConfig.settings.fusionauth_app_id,
      "loginId"       => @type.login_id,
      "password"      => @type.password,
    }.to_json
  end
end
