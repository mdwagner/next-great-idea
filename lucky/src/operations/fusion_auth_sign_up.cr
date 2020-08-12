class FusionAuthSignUp < Avram::Operation
  include HasuraErrorHelper

  param_key :input

  attribute email : String
  attribute firstName : String
  attribute lastName : String
  attribute middleName : String = ""
  attribute password : String

  property status : HTTP::Status = HTTP::Status::OK

  def submit(admin_role = false)
    # send user and registration request
    fa_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.post("/api/user/registration", body: registration_body(admin_role))
    end

    raise FusionAuthSignUpException.new(fa_response) if !fa_response.status.ok?

    # create new user in hasura (user_id -> external_user_id)
    hasura_response = AppHttpClient.execute(HttpClient::Hasura) do |client|
      client.post("/v1/graphql", body: create_user_mutation_body(fa_response.body))
    end

    raise HasuraSignUpException.new(hasura_response) if hasura_error?(hasura_response)

    yield self, success_response
  rescue ex : FusionAuthSignUpException
    # TODO
    # fusionauth had an error, retrieve and log error, return failure
    Log.debug { "Failed to sign up in FusionAuth" }
    res = ex.response
    Log.debug { "CODE: #{res.status_code}\nBODY: #{res.body}" }

    result = HasuraErrorSerializer.new
    @status = result.response_status
    yield self, result
  rescue ex : HasuraSignUpException
    # TODO
    # hasura had an error, retrieve and log error, try to remove fusionauth user, return failure

    Log.debug { "Failed to create user" }
    res = ex.response
    Log.debug { "CODE: #{res.status_code}\nBODY: #{res.body}" }

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
        "email"      => email.value,
        "firstName"  => firstName.value,
        "middleName" => middleName.value,
        "lastName"   => lastName.value,
        "password"   => password.value,
      },
    }.to_json
  end

  private def create_user_mutation_body(str)
    json = JSON.parse(str)

    query = <<-GRAPHQL
      mutation CreateUserDuringRegistration(
        $external_user_id: uuid,
        $email: String,
        $firstname: String,
        $lastname: String,
        $middlename: String = ""
      ) {
        insert_users_one(object: {
          external_user_id: $external_user_id,
          email: $email,
          firstname: $firstname,
          lastname: $lastname,
          middlename: $middlename
        }) {
          id
        }
      }
    GRAPHQL

    {
      "query"     => query,
      "variables" => {
        "external_user_id" => json.dig?("user", "id"),
        "email"            => json.dig?("user", "email"),
        "firstname"        => json.dig?("user", "firstName"),
        "lastname"         => json.dig?("user", "lastName"),
        "middlename"       => json.dig?("user", "middleName"),
      },
      "operationName" => "CreateUserDuringRegistration",
    }.to_json
  end

  private def success_response
    {
      "success" => true,
    }
  end

  class FusionAuthSignUpException < Exception
    include ResponseExceptionHelper
  end

  class HasuraSignUpException < Exception
    include ResponseExceptionHelper
  end
end
