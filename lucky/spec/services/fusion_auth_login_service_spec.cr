require "../spec_helper"

describe FusionAuthLoginService do
  it "should complete fusionauth login request" do
    WebMock.stub(:post, Regex.new(AppConfig.settings.fusionauth_url))
      .to_return(status: 200)

    params = {loginId: "admin@example.com", password: "Asdf123!"}.to_json
    input = FusionAuthLoginInput.from_json(params)

    code, _ = FusionAuthLoginService.new(input).call

    code.should eq 200
  end

  it "should fail to complete fusionauth login request" do
    WebMock.stub(:post, Regex.new(AppConfig.settings.fusionauth_url))
      .to_return(status: 401)

    params = {loginId: "admin@example.com", password: "Asdf123!"}.to_json
    input = FusionAuthLoginInput.from_json(params)

    code, _ = FusionAuthLoginService.new(input).call

    code.should eq 401
  end
end
