import React from "react";
import { createRoot } from "react-dom/client";
// All legacy Apollo packages are replaced by this single consolidated import:
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import SongList from "./components/SongList";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "/graphql" }), // Safe for both local dev and production
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <SongList />
      </Box>
    </ApolloProvider>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<Root />);
