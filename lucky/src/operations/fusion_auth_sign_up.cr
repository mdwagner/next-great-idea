class FusionAuthSignUp < Avram::Operation
  param_key :input

  attribute email : String
  attribute firstName : String
  attribute lastName : String
  attribute middleName : String = ""
  attribute password : String

  property status : HTTP::Status = HTTP::Status::OK

  def submit
    # send user and registration request
    fa_response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.post("/api/user/registration", body: registration_body)
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
    result = HasuraErrorSerializer.new
    @status = result.response_status
    yield self, result
  rescue ex : HasuraSignUpException
    # TODO
    # hasura had an error, retrieve and log error, try to remove fusionauth user, return failure
    result = HasuraErrorSerializer.new
    @status = result.response_status
    yield self, result
  end

  private def registration_body
    {
      "registration" => {
        "applicationId" => AppConfig.settings.fusionauth_app_id,
        "roles"         => [
          "user",
        ],
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
      mutation CreateUserFromRegistration(
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
        "external_user_id" => json["user"]["id"].as_s?,
        "email"            => json["user"]["email"].as_s?,
        "firstname"        => json["user"]["firstName"].as_s?,
        "lastname"         => json["user"]["lastName"].as_s?,
        "middlename"       => json["user"]["middleName"].as_s?,
      },
      "operationName" => "CreateUserFromRegistration",
    }.to_json
  end

  private def success_response
    {
      "success" => true,
      "message" => nil,
    }
  end

  private def hasura_error?(response)
    if !response.status.ok? || !response.body?
      return true
    end

    json = JSON.parse(response.body)
    if json["error"]? || json["errors"]?
      return true
    end

    return false
  end

  class FusionAuthSignUpException < Exception
    include ResponseExceptionHelper
  end

  class HasuraSignUpException < Exception
    include ResponseExceptionHelper
  end
end
