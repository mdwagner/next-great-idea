class Api::V1::Login < ApiAction
  post "/api/v1/login" do
    FusionAuthLogin.new(params).submit do |operation, serializer|
      json serializer, status: operation.status.code
    end
  end
end
