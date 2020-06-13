require "./app"

Habitat.raise_if_missing_settings!

app_server = AppServer.new
puts "Listening on http://#{app_server.host}:#{app_server.port}"

Signal::INT.trap do
  app_server.close
end

app_server.listen
