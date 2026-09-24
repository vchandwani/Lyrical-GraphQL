import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import SongList from "./components/SongList";
import App from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "/graphql" }),
});

// Fix 3: Hoist createBrowserRouter outside the component to prevent infinite re-renders
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SongList />,
      },
    ],
  },
]);

const Root = () => {
  return (
    <ApolloProvider client={client}>
      {/* RouterProvider must be self-closing in modern React Router */}
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<Root />);
