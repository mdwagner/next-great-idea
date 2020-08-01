class FusionAuthLoginService
  def initialize(@type : FusionAuthLoginType)
  end

  def call : Tuple(Int32, BaseSerializer)
    # TODO: add applicationId to request (get this from env)
    fa_response = FusionAuthHttpClient.client.post("/api/login", body: @type.to_json)

    if fa_response.status_code == 200 && fa_response.body?
      {200, FusionAuthLoginSerializer.new(fa_response.body)}
    else
      message = HTTP::Status::UNAUTHORIZED.description.not_nil!
      {401, ErrorSerializer.new(message: message)}
    end
  end
end
