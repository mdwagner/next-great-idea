require "http/client"
require "uri"

class HttpClientBase
  def self.uri
    raise NotImplementedError
  end

  def self.client
    c = HTTP::Client.new(URI.parse(uri))

    c.before_request do |request|
      request.headers["Accept"] = "application/json"
      request.headers["Content-Type"] = "application/json"
    end

    c
  end
end
