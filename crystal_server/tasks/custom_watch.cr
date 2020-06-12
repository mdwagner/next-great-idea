require "lucky/tasks/watch"

# TODO
class CustomWatch < Watch
  # override
  def call(args = ARGV)
    parse_options(args)

    build_commands = ["crystal build ./crystal_server/src/start_server.cr"]
    build_commands[0] += " --error-trace" if @show_full_error_trace
    run_commands = ["./start_server"]
    files = ["./crystal_server/src/**/*.cr", "./crystal_server/src/**/*.ecr", "./crystal_server/config/**/*.cr", "./shard.lock"]

    process_runner = LuckySentry::ProcessRunner.new(
      files: files,
      build_commands: build_commands,
      run_commands: run_commands,
      reload_browser: @reload_browser
    )

    puts "Beginning to watch your project"

    loop do
      process_runner.scan_files
      sleep 0.1
    end
  end
end
