#!/bin/bash
set -euxo pipefail

source scripts/helpers.sh

must_be_outside_docker

command_not_found_and_exit "docker-compose"

# destroy existing containers
_docker_compose down -v

# pull latest images for containers
_docker_compose pull

# start new containers
_docker_compose up -d
