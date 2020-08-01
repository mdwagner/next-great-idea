require "json"

class FusionAuthSignUpSerializer < BaseSerializer
  def initialize(json_str : String)
    @json = Response.from_json(json_str)
  end

  class Response
    include JSON::Serializable

    property success : Bool
    property message : String?
  end

  def render
    @json
  end
end
