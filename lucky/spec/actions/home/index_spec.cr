require "../../spec_helper"

describe Home::Index do
  it "should return the repository git commit sha" do
    AppConfig.settings.git_commit = "1" * 40

    response = AppClient.exec(Home::Index)

    response.should send_json(200, commit: AppConfig.settings.git_commit)
  end
end
