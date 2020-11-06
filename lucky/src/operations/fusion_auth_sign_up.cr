class FusionAuthSignUp < Avram::Operation
  include HasuraErrorHelper

  param_key :input

  attribute email : String
  attribute username : String
  attribute password : String

  property status : HTTP::Status = HTTP::Status::OK
  getter external_user_id : String? = nil

  def submit(admin_role = false, verify_email = true)
    client = FusionAuth::FusionAuthClient.new(
      AppConfig.settings.fusionauth_api_key,
      AppConfig.settings.fusionauth_url
    )

    roles = ["user"]
    roles << "admin" if admin_role
    response = client.register(nil, {
      "registration" => {
        "applicationId" => AppConfig.settings.fusionauth_app_id,
        "roles"         => roles,
      },
      "user" => {
        "email"    => email.value,
        "username" => username.value,
        "password" => password.value,
      },
      "skipRegistrationVerification" => true,
      "skipVerification"             => !verify_email,
    })

    if !response.was_successful
      log_fa_error(response)

      error_status = HTTP::Status.new(response.status == -1 ? 500 : response.status)
      result = HasuraErrorSerializer.new(error_status)
      @status = result.response_status

      return yield self, result
    end

    success_response = response.success_response.not_nil!

    response = AppHttpClient.execute(HttpClient::Hasura) do |http_client|
      http_client.post("/v1/graphql", body: create_user_mutation_body(success_response))
    end

    if hasura_error?(response)
      log_error(response)

      attempt_to_remove_fa_user(client) if external_user_id

      result = HasuraErrorSerializer.new
      @status = result.response_status

      return yield self, result
    end

    yield self, {"success" => true}
  end

  private def create_user_mutation_body(json)
    operation_name = "CreateUser"
    @external_user_id = json.dig("user", "id").as_s

    query = <<-GRAPHQL
      mutation #{operation_name}(
        $external_user_id: uuid!,
        $email: String!,
        $username: String!
      ) {
        insert_users_one(object: {
          external_user_id: $external_user_id,
          email: $email,
          username: $username
        }) {
          id
        }
      }
    GRAPHQL

    {
      "query"     => query,
      "variables" => {
        "external_user_id" => external_user_id,
        "email"            => json.dig("user", "email").as_s,
        "username"         => json.dig("user", "username").as_s,
      },
      "operationName" => operation_name,
    }.to_json
  end

  private def log_error(response, line = __LINE__)
    json = {
      "code" => response.status.code,
      "body" => response.body?,
    }.to_json

    Log.error { "#{__FILE__}:#{line} => #{json}" }
  end

  private def log_fa_error(response, line = __LINE__)
    json = {
      "code" => response.status,
      "body" => response.success_response.try(&.to_json),
    }.to_json

    Log.error { "#{__FILE__}:#{line} => #{json}" }
  end

  private def attempt_to_remove_fa_user(client)
    response = client.delete_user(external_user_id.not_nil!)

    if !response.was_successful
      log_fa_error(response)
    end
  end
end
