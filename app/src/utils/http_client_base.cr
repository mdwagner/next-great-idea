require "http/client"
require "dotenv"
require "uri"

class HttpClientBase
  @@client : HTTP::Client?

  def self.open
    raise NotImplementedError
  end

  def self.close
    if client = @@client
      client.close
    end
  end

  def self.client!
    open.not_nil!
  end

  private def self.create_client(uri_env : String)
    Dotenv.load? unless test_env?

    uri = URI.parse(ENV[uri_env])

    client = HTTP::Client.new(uri)

    client.before_request do |request|
      request.headers["Accept"] = "application/json"
      request.headers["Content-Type"] = "application/json"
    end

    client
  end

  private def self.test_env?
    if env = Kemal.config.env
      env.downcase == "test"
    end
  end
end
