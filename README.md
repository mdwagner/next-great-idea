# Introduction

![hasura](https://img.shields.io/github/workflow/status/mdwagner/next-great-idea/Hasura%20CI?label=hasura) ![ionic](https://img.shields.io/github/workflow/status/mdwagner/next-great-idea/Ionic%20CI?label=ionic)

An app for your _next_ idea!

## This app uses the following technologies:

- [PostgreSQL 12](https://www.postgresql.org/docs/12/)
- [Hasura GraphQL](https://hasura.io/docs/1.0/graphql/manual/index.html)
- [Ionic Framework (React)](https://ionicframework.com/docs)
- [AWS Cognito](https://aws.amazon.com/cognito/)

## Getting Started

### Requirements

- [git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- (Optional) [Node.js](https://nodejs.org/)
  - Only if not using Docker, check the `.tool-versions` file for the Node.js version to use.

### Quick Start

#### Clone repo

```sh
$ git clone https://github.com/mdwagner/next-great-idea.git
```

#### Use [VisualStudioCode Remote Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

```
Open Folder in Container
```

#### Create .env file in **hasura/** directory with the following content:

```sh
HASURA_GRAPHQL_ENDPOINT=<insert hasura endpoint here>
HASURA_GRAPHQL_ADMIN_SECRET=<insert hasura admin secret here>
```

#### Create .env file in **ionic/** directory with the following content:

```sh
REACT_APP_GRAPHQL_URL=<insert hasura graphql url here>
REACT_APP_ADMIN_SECRET=<insert hasura admin secret here>
```

#### Start up app:

```sh
$ cd ionic
$ npm ci
$ npm start
```

Go to [localhost:8100](http://localhost:8100) for Ionic Web app.

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

## Notes

- If you don't have your [local SSH agent running locally](https://code.visualstudio.com/docs/remote/containers#_using-ssh-keys), you may run into errors when pushing changes from _inside_ of the container. If you are still having issues, an alternative approach is pushing changes from _outside_ of the container.
