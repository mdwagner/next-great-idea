Spec.before_each do
  WebMock.reset                    # Clear mocks
  WebMock.allow_net_connect = true # For Lucky API Actions
end
