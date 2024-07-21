import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import AuthLayout from "./routes/AuthLayout";
import NavBar from "./routes/NavBar";
import LinkList from "./routes/LinkList";
import AboutPage from "./routes/AboutPage";
axios.defaults.baseURL = "https://url-jar.vercel.app";
// axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route element={<AuthLayout />}>
          {/* protected routes */}
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/short" element={<LinkList />}></Route>
        </Route>

        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
