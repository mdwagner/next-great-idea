require "http/client"
require "uri"

class BaseHttpClient
  def self.create(uri : String)
    client = HTTP::Client.new(URI.parse(uri))
    client.before_request do |request|
      request.headers["Accept"] = "application/json"
      request.headers["Content-Type"] = "application/json"
    end
    client
  end
end
