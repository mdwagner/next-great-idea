require "json"

class FusionAuthSignUpInput
  include JSON::Serializable

  property email : String

  @[JSON::Field(key: "firstName")]
  property first_name : String

  @[JSON::Field(key: "lastName")]
  property last_name : String

  @[JSON::Field(key: "middleName")]
  property middle_name : String?

  property password : String
end
