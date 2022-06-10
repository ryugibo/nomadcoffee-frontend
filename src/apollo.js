import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

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

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://nomadcoffee-backend-rgb.herokuapp.com/graphql/"
      : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
