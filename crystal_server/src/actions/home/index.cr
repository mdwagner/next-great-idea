class Home::Index < ApiAction
  get "/" do
    json({commit: commit})
  end

  memoize def commit : String
    `git rev-parse HEAD`.strip
  end
end
