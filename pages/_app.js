import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { AnimateSharedLayout } from "framer-motion";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export default function App({ Component, pageProps, statusCode, router }) {
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
    <>
      <ApolloProvider client={client}>
        {/* <Analytics /> */}
      <AnimateSharedLayout>
        <Component {...pageProps} key={router.route} />
        </AnimateSharedLayout>
      </ApolloProvider>
    </>
  );
}

// export function reportWebVitals(metric) {
//   console.log(metric);
// }
