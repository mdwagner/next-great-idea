# NextGreatIdea crystal application (Lucky Framework)

## Goals for project
- be a proxy between Hasura (using Hasura Actions) and FusionAuth
- provide robust cli tasks

## Commands
- `shards install` - installs crystal dependencies
- `hivemind` - starts up server in development mode and will re-compile project on file changes
- `crystal spec` - runs specs
    - add `focus: true` on `describe` and `it` blocks to focus which specs to run
- `crystal tool format src spec` - formats all crystal files in `src/` and `spec/`
    - `crystal tool format --check src spec` - only checks which files need to be formatted
- `lucky <commands...>` - runs built-in and custom lucky-cli tasks
