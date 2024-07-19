import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";

axios.defaults.baseURL = "https://url-jar-home.vercel.app";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
