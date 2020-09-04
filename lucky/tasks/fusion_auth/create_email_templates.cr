class FusionAuth::CreateEmailTemplates < LuckyCli::Task
  summary "Create NextGreatIdea Email Templates in FusionAuth"
  name "fa.create_email_templates"

  def call
    templates.each do |template|
      send_template(template)
    end

    puts "OK"
  end

  def error_response(response, name : String? = nil)
    if !response.status.ok?
      puts "NAME: #{name}" if name
      puts "CODE: #{response.status_code}"
      puts "BODY: #{response.body}"
      abort
    end
  end

  def send_template(template)
    id = template.delete("id")
    name = template["emailTemplate"]["name"]

    response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.post("/api/email/template/#{id}", body: template.to_json)
    end
    error_response(response, name)
  end

  def templates
    [
      {
        "id"            => AppConfig.settings.fusionauth_email_template_verification_id,
        "emailTemplate" => {
          "name"                => "Email Verification",
          "defaultSubject"      => "Verify your NextGreatIdea email address",
          "defaultHtmlTemplate" => (
            <<-HTML
[#if user.verified]
Pro tip, your email has already been verified, but feel free to complete the verification process to verify your verification of your email address.
[/#if]

To complete your email verification click on the following link.
<p>
  <a href="http://localhost:9011/email/verify/${verificationId}?tenantId=${user.tenantId}">
    http://localhost:9011/email/verify/${verificationId}?tenantId=${user.tenantId}
  </a>
</p>

- FusionAuth Admin
HTML
          ),
          "defaultTextTemplate" => (
            <<-TEXT
[#if user.verified]
Pro tip, your email has already been verified, but feel free to complete the verification process to verify your verification of your email address.
[/#if]

To complete your email verification click on the following link.

http://localhost:9011/email/verify/${verificationId}?tenantId=${user.tenantId}

- FusionAuth Admin
TEXT
          ),
        },
      },
    ]
  end
end
