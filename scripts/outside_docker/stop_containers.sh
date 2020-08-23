#!/bin/bash
set -euxo pipefail

source scripts/helpers.sh

must_be_outside_docker

command_not_found_and_exit "docker-compose"

# stop running containers
_docker_compose stop
