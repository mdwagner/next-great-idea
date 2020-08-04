module HasuraErrorHelper
  def hasura_error?(response : HTTP::Client::Response)
    return true if !response.status.ok?
    return true if !response.body?

    json = JSON.parse(response.body)
    return true if json["errors"]?

    false
  end
end
