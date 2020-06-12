require "json"

class FusionAuthLoginSerializer < BaseSerializer
  class Response
    include JSON::Serializable

    property token : String
    property user : JSON::Any
  end

  def initialize(@json_str : String)
  end

  def render
    Response.from_json(@json_str)
  end
end
