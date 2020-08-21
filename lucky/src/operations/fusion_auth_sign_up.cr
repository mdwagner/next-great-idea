class FusionAuthSignUp < Avram::Operation
  include HasuraErrorHelper

  param_key :input

  attribute email : String
  attribute username : String
  attribute password : String

  property status : HTTP::Status = HTTP::Status::OK
  getter external_user_id : String? = nil

  def submit(admin_role = false)
    fa_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.post("/api/user/registration", body: registration_body(admin_role))
    end

    raise FusionAuthSignUpException.new(fa_response) if !fa_response.status.ok?

    hasura_response = AppHttpClient.execute(HttpClient::Hasura) do |client|
      client.post("/v1/graphql", body: create_user_mutation_body(fa_response.body))
    end

    raise HasuraSignUpException.new(hasura_response) if hasura_error?(hasura_response)

    yield self, success_response
  rescue ex : FusionAuthSignUpException
    log_error(ex.response)

    result = HasuraErrorSerializer.new(ex.response.status)
    @status = result.response_status
    yield self, result
  rescue ex : HasuraSignUpException
    log_error(ex.response)

    attempt_to_remove_fa_user

    result = HasuraErrorSerializer.new
    @status = result.response_status
    yield self, result
  end

  private def registration_body(admin_role)
    roles = ["user"]
    roles << "admin" if admin_role

    {
      "registration" => {
        "applicationId" => AppConfig.settings.fusionauth_app_id,
        "roles"         => roles,
      },
      "user" => {
        "email"    => email.value,
        "username" => username.value,
        "password" => password.value,
      },
    }.to_json
  end

  private def create_user_mutation_body(str)
    operation_name = "CreateUser"
    json = JSON.parse(str)
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

  private def success_response
    {
      "success" => true,
    }
  end

  private def log_error(response, line = __LINE__)
    code = response.status.code
    body = response.body? || ""
    json = {
      "code" => code,
      "body" => body,
    }.to_json

    Log.error { "#{__FILE__}:#{line} => #{json}" }
  end

  private def attempt_to_remove_fa_user
    response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        request.headers.delete("Accept")
        request.headers.delete("Content-Type")
      end
      client.delete("/api/user/#{external_user_id}?hardDelete=true")
    end

    if !response.status.ok?
      log_error(response)
    end
  end

  class FusionAuthSignUpException < Exception
    include ResponseExceptionHelper
  end

  class HasuraSignUpException < Exception
    include ResponseExceptionHelper
  end
end
