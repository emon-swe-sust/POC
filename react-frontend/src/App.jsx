import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </ApolloClientProvider>
  );
}

function RouterComponent() {
  const location = useLocation();

  const hideNavPaths = ["/login", "/registration"];
  const shouldHideNav = hideNavPaths.includes(location.pathname);

  return (
    <div className="App">
      {!shouldHideNav && <Nav />}
      <Routes>
        <Route path="/" element={<Exams />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/exam/:examId" element={<ExamDetails />} />
      </Routes>
    </div>
  );
}

export default App;
