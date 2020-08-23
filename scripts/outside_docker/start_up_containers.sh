#!/bin/bash
set -euxo pipefail

source scripts/helpers.sh

must_be_outside_docker

command_not_found_and_exit "docker-compose"

# start new containers
_docker_compose up -d
