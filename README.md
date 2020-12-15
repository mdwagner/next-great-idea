# Introduction
![hasura](https://img.shields.io/github/workflow/status/mdwagner/next-great-idea/Hasura%20CI?label=hasura) ![ionic](https://img.shields.io/github/workflow/status/mdwagner/next-great-idea/Ionic%20CI?label=ionic) ![nestjs](https://img.shields.io/github/workflow/status/mdwagner/next-great-idea/NestJS%20CI?label=nestjs)

An app for your _next_ idea!

## This app uses the following technologies:
- [PostgreSQL 12](https://www.postgresql.org/docs/12/)
- [Hasura GraphQL](https://hasura.io/docs/1.0/graphql/manual/index.html)
- [Ionic Framework (React)](https://ionicframework.com/docs)
- [FusionAuth](https://fusionauth.io/docs/v1/tech/)
- [NestJS](https://docs.nestjs.com/)

## Getting Started

### Requirements
- [git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### Quick Start

#### Clone repo
```sh
$ git clone https://github.com/mdwagner/next-great-idea.git
```

#### Use [VisualStudioCode Remote Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
```
Open Folder in Container
```

#### Run the following commands in order:
**TERMINAL 1** (Keep open)
```sh
$ cd ionic
$ npm ci
$ npm start
```
Go to [localhost:8100](http://localhost:8100) for Ionic Web app.

**TERMINAL 2** (Keep open)
```sh
$ cd nestjs
$ npm ci
$ npm run start:dev
```
Go to [localhost:5000/graphql](http://localhost:5000/graphql) for NestJS GraphQL Playground.

**TERMINAL 3** (Keep open)
```sh
$ cd hasura
$ npm ci
$ npm run migrate
$ npm start
```
Go to [localhost:9695](http://localhost:9695) for Hasura web console.

**TERMINAL 4** (You can close this one when finished)
```sh
$ cd nestjs
$ npx task fa:genesis
```

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
