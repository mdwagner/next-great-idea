class FusionAuthLoginService
  def initialize(@input : FusionAuthLoginInput)
  end

  def call : Tuple(Int32, BaseSerializer)
    # TODO: add applicationId to request (get this from env)
    # TODO: add ipAddress to request (use X-Forwarded-For header)
    fa_response = FusionAuthHttpClient.new.client.post("/api/login", body: request_json)

    if fa_response.status_code == 200 && fa_response.body?
      {200, FusionAuthLoginSerializer.new(fa_response.body)}
    else
      message = HTTP::Status::UNAUTHORIZED.description.not_nil!
      {401, ErrorSerializer.new(message: message)}
    end
  end

  private def request_json
    @input.to_json
  end
end
