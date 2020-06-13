require "http/client"
require "uri"

class BaseHttpClient
  def uri : String
    raise NotImplementedError
  end

  private def create_client
    c = HTTP::Client.new(URI.parse(uri))
    c.before_request do |request|
      request.headers["Accept"] = "application/json"
      request.headers["Content-Type"] = "application/json"
    end
    c
  end
end
