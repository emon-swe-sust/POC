import ApolloClientProvider from "./configuration/ApolloClient";
import { HelloWorld } from "./HelloWorld";

function App() {
  return (
    <ApolloClientProvider>
      <div className="App">
        <HelloWorld />
      </div>
    </ApolloClientProvider>
  );
}

export default App;
