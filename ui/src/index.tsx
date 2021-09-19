import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const url = new URL(window.location.href);

const uri = `${url.protocol}//${url.host}${
  url.port ? `:${url.port}` : ""
}/meals/graphql`;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
