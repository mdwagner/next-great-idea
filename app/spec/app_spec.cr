require "./spec_helper"

describe "App" do
  describe "/login" do
    it "should complete fusionauth login request" do
      WebMock.stub(:post, Regex.new(AppConfig.settings.fusionauth_url))
        .to_return(status: 200, body: {token: "123", user: "{}"}.to_json)

      post("/login", body: {loginId: "admin@example.com", password: "Asdf123!"}.to_json)

      response.status_code.should eq 200
    end

    it "should fail to complete fusionauth login request" do
      WebMock.stub(:post, Regex.new(AppConfig.settings.fusionauth_url))
        .to_return(status: 401)

      post("/login", body: {loginId: "admin@example.com", password: "Asdf123!"}.to_json)

      response.status_code.should eq 401
    end
  end
end
