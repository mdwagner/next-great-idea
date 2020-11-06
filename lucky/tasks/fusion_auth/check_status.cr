class FusionAuth::CheckStatus < LuckyCli::Task
  summary "Check status of FusionAuth"
  name "fa.check_status"

  def call
    response = FusionAuth::RESTClient.new(URI.parse(AppConfig.settings.fusionauth_url))
      .authorization(AppConfig.settings.fusionauth_api_key)
      .uri("/api/status")
      .get
      .go

    if response.was_successful
      puts "OK"
    else
      abort "ERROR"
    end
  end
end
