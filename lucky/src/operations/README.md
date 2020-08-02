# Operations

## Hasura

### Please refer to the [Action handlers](https://hasura.io/docs/1.0/graphql/manual/actions/action-handlers.html) documenation for more information

### POST Request Payload Example
```json
{
  "action": {
    "name": "<action-name>"
  },
  "input": {
    "arg1": "<value>",
    "arg2": "<value>"
  },
  "session_variables": {
    "x-hasura-user-id": "<session-user-id>",
    "x-hasura-role": "<session-user-role>"
  }
}
```
All **session_variables** in the request payload have lowercase keys.

The HTTP status code must be 2xx for a successful response.
