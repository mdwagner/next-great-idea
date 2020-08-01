class FusionAuthSignUp < Avram::Operation
  include StatusHelper

  param_key :input

  attribute email : String
  attribute firstName : String
  attribute lastName : String
  attribute middleName : String = ""
  attribute password : String

  def submit
    # send user and registration request
    fa_response = AppHttpClient.execute(AppHttpClient::FusionAuth) do |client|
      client.post("/api/user/registration", body: registration_body)
    end

    if !fa_response.status.ok? || !fa_response.body?
      @status = HTTP::Status::INTERNAL_SERVER_ERROR
      return yield self, ErrorSerializer.new(message: @status.description.not_nil!)
    end

    fa_json = JSON.parse(fa_response.body.not_nil!)

    # get user_id from response
    fa_user_id = fa_json["user"]["id"].as_s

    # create new user in hasura (user_id -> external_user_id)
    hasura_response = AppHttpClient.execute(AppHttpClient::Hasura) do |client|
      client.post("/v1/graphql", body: create_user_mutation_body(fa_user_id))
    end

    # need to check if hasura worked or not
    # if hasura fails to create user, also delete fusionauth user
    if hasura_response.status.ok?
      # TODO
    end

    yield self, FusionAuthSignUpSerializer.new({"success" => true}.to_json)
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

  private def create_user_mutation_body(external_user_id)
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
        "external_user_id" => external_user_id,
        "email"            => email.value,
        "firstname"        => firstName.value,
        "lastname"         => lastName.value,
        "middlename"       => middleName.value,
      },
      "operationName" => "CreateUserFromRegistration",
    }.to_json
  end
end
