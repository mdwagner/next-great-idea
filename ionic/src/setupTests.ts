// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// mock environment variables
process.env.REACT_APP_GRAPHQL_URL = "http://localhost:8080/graphql";
process.env.REACT_APP_ADMIN_SECRET = "secret";
