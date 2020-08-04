class FusionAuth::CheckStatus < LuckyCli::Task
  summary "Check status of FusionAuth"
  name "fa.check_status"

  def call
    response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        request.headers.delete("Accept")
        request.headers.delete("Content-Type")
      end
      client.get("/api/status")
    end

    if response.status.ok?
      puts "OK"
    else
      abort "ERROR"
    end
  end
end
