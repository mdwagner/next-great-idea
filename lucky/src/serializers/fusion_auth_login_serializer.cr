require "json"

class FusionAuthLoginSerializer < BaseSerializer
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

  def initialize(@json_str : String)
  end

  def render
    Response.from_json(@json_str)
  end
end
