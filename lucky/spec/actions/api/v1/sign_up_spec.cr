require "../../../spec_helper"

describe Api::V1::SignUp do
  it "should complete sign up request" do
    WebMock.stub(:post, /#{AppConfig.settings.fusionauth_url}/)
      .to_return(status: 200, body: {
        "user" => {
          "id"        => "38fb129d-dfc1-4100-ad4f-3d7a44095e5e",
          "email"     => "admin@example.com",
          "firstName" => "Admin",
          "lastName"  => "User",
        },
      }.to_json)

    WebMock.stub(:post, /#{AppConfig.settings.hasura_graphql_url}/)
      .to_return(status: 200, body: {
        "data" => {} of String => String,
      }.to_json)

    response = AppClient.exec(Api::V1::SignUp, input: {email: "admin@example.com", firstName: "Admin", lastName: "User", password: "Asdf123!"})

    response.should send_json(200,
      success: true
    )
  end

  it "should fail to sign up (fusionauth)" do
    WebMock.stub(:post, /#{AppConfig.settings.fusionauth_url}/)
      .to_return(status: 500, body: {
        "errors" => {} of String => String,
      }.to_json)

    response = AppClient.exec(Api::V1::SignUp, input: {email: "admin@example.com", firstName: "Admin", lastName: "User", password: "Asdf123!"})

    response.should send_json(400,
      code: "500",
      message: "Internal Server Error"
    )
  end

  it "should fail to sign up (hasura)" do
    WebMock.stub(:post, /#{AppConfig.settings.fusionauth_url}/)
      .to_return(status: 200, body: {
        "user" => {
          "id"        => "38fb129d-dfc1-4100-ad4f-3d7a44095e5e",
          "email"     => "admin@example.com",
          "firstName" => "Admin",
          "lastName"  => "User",
        },
      }.to_json)

    WebMock.stub(:post, /#{AppConfig.settings.hasura_graphql_url}/)
      .to_return(status: 200, body: {
        "errors" => {
          "name" => "test",
        },
      }.to_json)

    WebMock.stub(:delete, /#{AppConfig.settings.fusionauth_url}/)
      .to_return(status: 200, body: {
        "errors" => {} of String => String,
      }.to_json)

    response = AppClient.exec(Api::V1::SignUp, input: {email: "admin@example.com", firstName: "Admin", lastName: "User", password: "Asdf123!"})

    response.should send_json(400,
      code: "500",
      message: "Internal Server Error"
    )
  end
end
