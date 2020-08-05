class EnsureServerConnection
  def self.run
    connected = false
    max_attempts = 30
    attempt = 0
    until connected || (attempt >= max_attempts)
      begin
        HTTP::Client.new(Lucky::ServerSettings.host, Lucky::ServerSettings.port) do |client|
          response = client.get("/")
          if response.status_code == 200
            connected = true
          else
            raise "error"
          end
        end
      rescue
        attempt += 1
        sleep 1
      end
    end
  end
end
