require "json"

class FusionAuthLoginInput
  include JSON::Serializable

  property password : String

  @[JSON::Field(key: "loginId")]
  property login_id : String

  @[JSON::Field(key: "applicationId")]
  property application_id : String?

  @[JSON::Field(key: "ipAddress")]
  property ip_address : String?
end
