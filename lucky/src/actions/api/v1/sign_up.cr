class Api::V1::SignUp < ApiAction
  post "/api/v1/sign_up" do
    FusionAuthSignUp.new(params).submit do |operation, serializer|
      json serializer, status: operation.status.code
    end
  end
end
