require "json"

module FusionAuthApi
  class LoginRequest
    include JSON::Serializable

    property password : String

    @[JSON::Field(key: "loginId")]
    property login_id : String

    @[JSON::Field(key: "applicationId")]
    property application_id : String?

    @[JSON::Field(key: "ipAddress")]
    property ip_address : String?
  end

  class LoginResponse
    include JSON::Serializable

    property token : String
    property user : JSON::Any
  end
end
