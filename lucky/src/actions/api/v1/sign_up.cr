class Api::V1::SignUp < ApiAction
  post "/api/v1/sign_up" do
    input = FusionAuthSignUpInput.from_json(params_input_to_json)
    code, serializer = FusionAuthSignUpService.new(input).call

    json(serializer, status: code)
  end
end
