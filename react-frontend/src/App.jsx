import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApolloClientProvider from "./configuration/ApolloClient";
import { CreateQuestion } from "./components/CreateQuestion";
import { Exams } from "./components/Exams";
import { Nav } from "./components/Nav";
import { ExamDetails } from "./components/ExamDetails";
import { Login } from "./components/authentication/Login";
import { Registration } from "./components/authentication/Registration";

function App() {
  return (
    <ApolloClientProvider>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/create-question" element={<CreateQuestion />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/exam/:examId" element={<ExamDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloClientProvider>
  );
}

export default App;
