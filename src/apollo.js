import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "TOKEN";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const darkModeVar = makeVar(false);

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://nomadcoffee-backend-rgb.herokuapp.com/graphql/"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
