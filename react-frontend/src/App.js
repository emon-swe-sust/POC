import { Nav } from "./components/Nav";
import ApolloClientProvider from "./configuration/ApolloClient";
import { HelloWorld } from "./HelloWorld";

function App() {
  return (
    <ApolloClientProvider>
      <div className="App">
        <Nav />
      </div>
    </ApolloClientProvider>
  );
}

export default App;
