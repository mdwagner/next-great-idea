require "./spec_helper"

describe "App" do
  describe "/login" do
    it "works" do
      post("/login")
      expected = {success: true}.to_json
      response.body.not_nil!.should eq expected
    end
  end
end
