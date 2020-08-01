require "json"

class FusionAuthLoginSerializer < BaseSerializer
  def initialize(json_str : String)
    @json = Response.from_json(json_str)
  end

  class Response
    include JSON::Serializable

    property token : String
    property user : User
  end

  class User
    include JSON::Serializable

    property id : String
    property active : Bool
    property data : JSON::Any?
    property email : String
    property timezone : String?
    property username : String?
    property verified : Bool
  end

  def render
    {
      "token"    => @json.token,
      "id"       => @json.user.id,
      "active"   => @json.user.active,
      "data"     => @json.user.data,
      "email"    => @json.user.email,
      "timezone" => @json.user.timezone,
      "username" => @json.user.username,
      "verified" => @json.user.verified,
    }
  end
end
