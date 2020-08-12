module Lucky::Env
  extend self

  {% for env in [:development, :test, :production] %}
    def {{ env.id }}?
      name == {{ env.id.stringify }}
    end
  {% end %}

  def name
    ENV["LUCKY_ENV"]? || "development"
  end

  def fetch!(key : String, default : String | Proc(String)) : String
    if ENV.has_key?(key) || production?
      ENV[key]
    else
      default.responds_to?(:call) ? default.call : default
    end
  end
end
