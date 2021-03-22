import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import "./index.css";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/meals/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

Modal.setAppElement("#root");
