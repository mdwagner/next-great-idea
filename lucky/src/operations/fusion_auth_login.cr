class FusionAuthLogin < Avram::Operation
  param_key :input

  attribute loginId : String
  attribute password : String

  property status : HTTP::Status = HTTP::Status::OK

  def submit
    client = FusionAuth::FusionAuthClient.new(
      AppConfig.settings.fusionauth_api_key,
      AppConfig.settings.fusionauth_url
    )

    response = client.login({
      "applicationId" => AppConfig.settings.fusionauth_app_id,
      "loginId"       => loginId.value,
      "password"      => password.value,
    })

    if response.was_successful
      success_response = response.success_response.not_nil!

      yield self, {
        "token"    => success_response["token"].as_s,
        "id"       => success_response["user"]["id"].as_s,
        "email"    => success_response["user"]["email"].as_s,
        "username" => success_response["user"]["username"].as_s,
      }
    else
      Log.debug { "Failed to login" }

      result = HasuraErrorSerializer.new(status: HTTP::Status::UNAUTHORIZED)
      @status = result.response_status

      yield self, result
    end
  end
end
