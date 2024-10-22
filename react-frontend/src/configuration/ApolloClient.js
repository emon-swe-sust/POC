import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql", // Point to your Spring Boot GraphQL server
  cache: new InMemoryCache(),
});

function ApolloClientProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
