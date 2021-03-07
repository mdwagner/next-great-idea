exports.handler = async (event, context) => {
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        "https://hasura.io/jwt/claims": JSON.stringify({
          "x-hasura-user-id": event.request.userAttributes.sub,
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
        }),
      },
    },
  };
  return event;
};
