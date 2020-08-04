class Home::Index < ApiAction
  get "/" do
    json({commit: AppConfig.settings.git_commit})
  end
end
