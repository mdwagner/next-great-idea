require "./spec_helper"

describe "App" do
  describe "/login" do
    it "successfully creates external clients" do
      post("/login")

      expected = {
        "fusionauth_host" => "localhost",
        "fusionauth_port" => 9011,
        "hasura_host" => "localhost",
        "hasura_port" => 8080
      }.to_json

      response.status_code.should eq 200
      response.body.not_nil!.should eq expected
    end
  end
end
