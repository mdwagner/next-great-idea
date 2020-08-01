class Api::V1::Login < ApiAction
  post "/api/v1/login" do
    type = FusionAuthLoginType.from_json(params_input_to_json)
    code, serializer = FusionAuthLoginService.new(type).call

    json(serializer, status: code)
  end
end
