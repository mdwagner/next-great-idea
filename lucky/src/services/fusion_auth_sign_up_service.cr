class FusionAuthSignUpService
  def initialize(@input : FusionAuthSignUpInput)
  end

  def call : Tuple(Int32, BaseSerializer)
    # TODO: below is WIP
    # send user and registration request
    # get user_id from response
    # create new user in hasura (user_id -> external_user_id)
    # normal response

    # if hasura fails to create user, also delete fusionauth user

    fa_response = FusionAuthHttpClient.new.client.post("/api/user/registration", body: request_json)

    # TODO: below code is copy-paste/not used yet
    if fa_response.status_code == 200 && fa_response.body?
      {200, FusionAuthSignUpSerializer.new(fa_response.body)}
    else
      message = HTTP::Status::UNAUTHORIZED.description.not_nil!
      {401, ErrorSerializer.new(message: message)}
    end
  end

  private def request_json
    @input.to_json
  end
end
