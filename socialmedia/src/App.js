import { Routes, Route } from "react-router-dom";
import Register from "./Components/Registere";
import Login from "./Components/Login";
import Posts from "./Components/Posts";
import Navbar from "./Components/Navbar";
import ForgPass from "./Components/ForgettenPassword";
function App() {
  return (
    <div >
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/navbar" element={<Navbar />} />
        <Route exact path="/post" element={<Posts />} />
        <Route exact path="/forgettenPassword" element={<ForgPass />} />

      </Routes>
    </div>
  );
}

export default App;
