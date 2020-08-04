module ResponseExceptionHelper
  property response : HTTP::Client::Response

  def initialize(@response)
    super()
  end
end
