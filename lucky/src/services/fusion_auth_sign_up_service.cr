class FusionAuthSignUpService
  def initialize(@type : FusionAuthSignUpType)
  end

  def call : Tuple(Int32, BaseSerializer)
    # send user and registration request
    fa_response = FusionAuthHttpClient.client.post("/api/user/registration", body: registration_body)

    # get user_id from response
    if fa_response.status_code != 200
      status = HTTP::Status::INTERNAL_SERVER_ERROR
      message = status.description.not_nil!
      code = status.code
      return {code, ErrorSerializer.new(message: message)}
    end
    fa_json = JSON.parse(fa_response.body.not_nil!)

    # create new user in hasura (user_id -> external_user_id)
    fa_user_id = fa_json["user"]["id"].as_s
    hasura_response = HasuraHttpClient.client.post("/v1/graphql", body: create_user_mutation_body(fa_user_id))
    # need to check if hasura worked or not
    # if hasura fails to create user, also delete fusionauth user

    # normal response
    response = {
      "success" => true,
    }.to_json
    {200, FusionAuthSignUpSerializer.new(response)}
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
        "email"      => @type.email,
        "firstName"  => @type.first_name,
        "middleName" => @type.middle_name,
        "lastName"   => @type.last_name,
        "password"   => @type.password,
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
        "email"            => @type.email,
        "firstname"        => @type.first_name,
        "lastname"         => @type.last_name,
        "middlename"       => @type.middle_name,
      },
      "operationName" => "CreateUserFromRegistration",
    }.to_json
  end
end
