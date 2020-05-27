# Introduction
An app for your _next_ idea!

## This app uses the following technologies:
- [PostgreSQL 12](https://www.postgresql.org/docs/12/)
- [Hasura GraphQL](https://hasura.io/docs/1.0/graphql/manual/index.html)
- [Ionic Framework (React)](https://ionicframework.com/docs)

## Getting Started

### Requirements
- [Node.JS 12](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Quick Start
1. Initialize Docker: `docker-compose up -d`
1. Install dependencies: `npm install`
1. Initialize Postgres with Hasura migrations: `npm run migrate`
1. Start apps:
    - Hasura console: `npm run console`
    - Ionic app (web): `npm run serve`
