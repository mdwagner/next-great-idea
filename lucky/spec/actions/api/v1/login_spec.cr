require "../../../spec_helper"

describe Api::V1::Login do
  it "should complete fusionauth login request" do
    WebMock.stub(:post, Regex.new(AppConfig.settings.fusionauth_url))
      .to_return(status: 200, body: {
        "token" => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "user"  => {
          "id"       => "38fb129d-dfc1-4100-ad4f-3d7a44095e5e",
          "active"   => true,
          "data"     => nil,
          "email"    => "admin@example.com",
          "timezone" => nil,
          "username" => nil,
          "verified" => true,
        },
      }.to_json)

    response = AppClient.exec(Api::V1::Login, input: {loginId: "admin@example.com", password: "Asdf123!"})

    response.should send_json(200,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      id: "38fb129d-dfc1-4100-ad4f-3d7a44095e5e",
      active: true,
      data: nil,
      email: "admin@example.com",
      timezone: nil,
      username: nil,
      verified: true
    )
  end

  it "should fail to complete fusionauth login request" do
    WebMock.stub(:post, Regex.new(AppConfig.settings.fusionauth_url))
      .to_return(status: 401)

    response = AppClient.exec(Api::V1::Login, input: {loginId: "admin@example.com", password: "Asdf123!"})

    response.should send_json(400,
      message: "Unauthorized",
      code: 401
    )
  end
end
