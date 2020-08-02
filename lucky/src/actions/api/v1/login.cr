class Api::V1::Login < ApiAction
  post "/api/v1/login" do
    FusionAuthLogin.new(params).submit do |operation, result|
      json result, status: operation.status.code
    end
  end
end
