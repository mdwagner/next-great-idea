require "json"

class FusionAuthLoginType
  include JSON::Serializable

  property password : String

  @[JSON::Field(key: "loginId")]
  property login_id : String
end
