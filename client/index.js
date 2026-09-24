import React from "react";
import { createRoot } from "react-dom/client";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "/graphql" }),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<Root />);
