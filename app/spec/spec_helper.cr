require "spec"
require "spec-kemal"
require "webmock"
require "../src/next_great_idea"

Spec.before_each &->WebMock.reset
