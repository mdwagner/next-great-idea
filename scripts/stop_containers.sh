#!/bin/bash
set -euxo pipefail

if ! command -v docker-compose &> /dev/null
then
    echo "docker-compose could not be found"
    exit
fi

_docker_compose () {
  docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml "$@"
}

# stop running containers
_docker_compose stop
