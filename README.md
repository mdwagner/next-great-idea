# Introduction
An app for your _next_ idea!

## This app uses the following technologies:
- [PostgreSQL 12](https://www.postgresql.org/docs/12/)
- [Hasura GraphQL](https://hasura.io/docs/1.0/graphql/manual/index.html)
- [Ionic Framework (React)](https://ionicframework.com/docs)
- [FusionAuth](https://fusionauth.io/docs/v1/tech/)
- [Lucky Framework](https://luckyframework.org/guides/getting-started/why-lucky)

## Getting Started

### Requirements
- [git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### Quick Start
- Clone repo
- VS Code Remote Containers extension (easy)
    - Open Folder in Container
- Docker Compose (advanced)
    - `$ docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml up -d`
    - `$ docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml exec --workdir=/workspace dev-container bash`

### NOTES
- `git` might not work that well inside the container (errors, etc.), so it's recommended to do any `git` commands outside of the container.

## Contributing
This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Usage is up to developer discretion. We only ask you follow these conventions:
- commit prefix is lowercase `<type>[optional scope]`
    - Ex: `fix(react): Fixed everything lol`
- commit prefix breaking changes use `!`
    - Ex: `refactor!: drop IE 11`
- branch names can be whatever developer wants
    - Ex: `whatever-i-want`
    - Ex: `not-master`
    - Ex: `ticket-123`
