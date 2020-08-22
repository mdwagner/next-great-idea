class FusionAuth::Genesis < LuckyCli::Task
  summary "Create all configuration and development users for FusionAuth"
  name "fa.genesis"

  def call
    FusionAuth::CheckStatus.new.call
    FusionAuth::CreateTenant.new.call
    FusionAuth::CreateApp.new.call
    FusionAuth::SeedUsers.new.call
  end
end
