import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps, statusCode }) {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: relayStylePagination(),
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    cache,
  });

  return (
    <ApolloProvider client={client}>
      {/* <Analytics /> */}

      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export function reportWebVitals(metric) {
  console.log(metric);
}
