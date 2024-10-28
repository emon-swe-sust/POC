import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApolloClientProvider from "./configuration/ApolloClient";
import { CreateQuestion } from "./components/CreateQuestion";
import { Exams } from "./components/Exams";
import { Nav } from "./components/Nav";
import { Exam } from "./components/Exam";

function App() {
  return (
    <ApolloClientProvider>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/create-question" element={<CreateQuestion />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exam/:examId" element={<Exam />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloClientProvider>
  );
}

export default App;
