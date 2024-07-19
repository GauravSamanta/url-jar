import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import AuthLayout from "./routes/AuthLayout";

axios.defaults.baseURL = "https://url-jar.vercel.app";
// axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<HomePage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
    </Routes>
  );
}

export default App;
