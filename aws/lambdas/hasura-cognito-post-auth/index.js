const { default: fetch } = require("node-fetch");

exports.handler = async (event, context) => {
  const userId = event.request.userAttributes.sub;
  const username = event.userName;
  const email = event.request.userAttributes.email;

  console.log("user_id", userId);
  console.log("username", username);
  console.log("email", email);

  const upsertUserQuery = `
    mutation ($userId: uuid!, $username: String!, $email: String!) {
      insert_users(objects: [{id: $userId, username: $username, email: $email}], on_conflict: {constraint: users_pkey, update_columns: [username, email]}) {
        affected_rows
      }
    }
  `;

  await fetch(process.env.GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_SECRET,
    },
    body: JSON.stringify({
      query: upsertUserQuery,
      variables: {
        userId,
        username,
        email,
      },
    }),
  });

  return event;
};
