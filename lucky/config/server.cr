# Here is where you configure the Lucky server
#
# Look at config/route_helper.cr if you want to change the domain used when
# generating links with `Action.url`.
Lucky::Server.configure do |settings|
  if Lucky::Env.production?
    settings.host = "0.0.0.0"
    settings.port = ENV["PORT"].to_i
    settings.gzip_enabled = true
    # By default certain content types will be gzipped.
    # For a full list look in
    # https://github.com/luckyframework/lucky/blob/master/src/lucky/server.cr
    # To add additional extensions do something like this:
    # config.gzip_content_types << "content/type"
  else
    # Change host/port in config/watch.yml
    # Alternatively, you can set the DEV_PORT env to set the port for local development
    settings.host = Lucky::ServerSettings.host
    settings.port = Lucky::ServerSettings.port
  end

  # By default Lucky will serve static assets in development and production.
  #
  # However you could use a CDN when in production like this:
  #
  #   Lucky::Server.configure do |settings|
  #     if Lucky::Env.production?
  #       settings.asset_host = "https://mycdnhost.com"
  #     else
  #       settings.asset_host = ""
  #     end
  #   end
  settings.asset_host = "" # Lucky will serve assets
  settings.secret_key_base = "bb4O/hHXvkKhqQH6WP4lVD4H9/nq5UlcLpVn/2hX36c="
end

Lucky::ForceSSLHandler.configure do |settings|
  # To force SSL in production, uncomment the lines below.
  # This will cause http requests to be redirected to https:
  #
  #    settings.enabled = Lucky::Env.production?
  #    settings.strict_transport_security = {max_age: 1.year, include_subdomains: true}
  #
  # Or, leave it disabled:
  settings.enabled = false
end
