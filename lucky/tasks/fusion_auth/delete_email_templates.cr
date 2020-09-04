class FusionAuth::DeleteEmailTemplates < LuckyCli::Task
  summary "Delete NextGreatIdea Email Templates in FusionAuth"
  name "fa.delete_email_templates"

  def call
    templates.each do |template|
      delete_template(template)
    end
  end

  def error_response(response, name : String? = nil)
    if !response.status.ok?
      puts "NAME: #{name}" if name
      puts "CODE: #{response.status_code}"
      puts "BODY: #{response.body}"
      abort
    end
  end

  def delete_template(template)
    id = template.delete("id")
    name = template["emailTemplate"]["name"]

    response = AppHttpClient.execute(HttpClient::FusionAuth) do |client|
      client.before_request do |request|
        request.headers.delete("Accept")
        request.headers.delete("Content-Type")
      end
      client.delete("/api/email/template/#{id}")
    end
    error_response(response, name)
  end

  def templates
    [
      {
        "id"            => AppConfig.settings.fusionauth_email_template_verification_id,
        "emailTemplate" => {
          "name" => "Email Verification",
        },
      },
    ]
  end
end
