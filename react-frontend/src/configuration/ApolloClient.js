import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
    Credential: "include",
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function ApolloClientProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
