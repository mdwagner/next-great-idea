class Api::V1::Login < ApiAction
  post "/api/v1/login" do
    input = FusionAuthLoginType.from_json(params_input_to_json)
    code, serializer = FusionAuthLoginService.new(input).call

    json(serializer, status: code)
  end
end
