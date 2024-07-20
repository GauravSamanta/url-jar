import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import AuthLayout from "./routes/AuthLayout";
import CreateLink from "./routes/CreateLink";
import NavBar from "./routes/NavBar";

axios.defaults.baseURL = "https://url-jar.vercel.app";
// axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="demo" element={<CreateLink />}></Route>

        <Route element={<AuthLayout />}>
          {/* protected routes */}

          <Route path="/" element={<HomePage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
