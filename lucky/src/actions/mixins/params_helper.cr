module Mixins::ParamsHelper
  def params_to_json
    params_from_json.to_json
  end

  def params_from_json
    params.from_json
  end

  def params_input_to_json
    params_from_json["input"].to_json
  end

  def params_input_body_to_json
    params_from_json["input"]["body"].to_json
  end
end
