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

# destroy existing containers
_docker_compose down -v

# pull latest images for containers
_docker_compose pull

# start new containers
_docker_compose up -d
