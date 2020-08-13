# https://hasura.io/docs/1.0/graphql/manual/actions/action-handlers.html#returning-an-error-response
class HasuraErrorSerializer < BaseSerializer
  property status : HTTP::Status
  property message : String?

  def initialize(@status = HTTP::Status::INTERNAL_SERVER_ERROR, @message = nil)
  end

  # The HTTP status code must be 4xx for an error response.
  def response_status
    HTTP::Status::BAD_REQUEST
  end

  def render
    @message = @status.description.not_nil! if @message.nil?
    {
      "message" => @message,
      "code"    => @status.code.to_s,
    }
  end
end
