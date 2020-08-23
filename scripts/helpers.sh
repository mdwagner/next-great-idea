#!/bin/bash

# Returns true if the command $1 is not found
# example:
#   if command_not_found "yarn"; then
#     echo "no yarn"
#   fi
command_not_found() {
  ! command -v $1 > /dev/null
  return $?
}

# Same as command_not_found, except prints error message and exit
command_not_found_and_exit() {
  if command_not_found $1; then
    echo "$1 could not be found"
    exit
  fi
}

# Returns true if the OS is macOS
# example:
#   if is_mac; then
#     echo "do mac stuff"
#   fi
is_mac() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    true
  else
    false
  fi
}

# Returns true if the OS is linux based
# example:
#   if is_linux; then
#     echo "do linux stuff"
#   fi
is_linux() {
  if [[ "$OSTYPE" == "linux"* ]]; then
    true
  else
    false
  fi
}

# Returns true if the OS is running inside a docker container
# example:
#   if is_docker; then
#     echo "do stuff inside docker"
#   fi
is_docker() {
  if command grep docker /proc/1/cgroup -qa; then
    true
  else
    false
  fi
}

must_be_outside_docker() {
  if is_docker; then
    echo "must be outside of docker container"
    exit
  fi
}

_docker_compose () {
  command docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml "$@"
}
