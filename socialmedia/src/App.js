import { Routes, Route } from "react-router-dom";
import Register from "./Components/Registere";
import Login from "./Components/Login";
import Posts from "./Components/Posts";
import Navbar from "./Components/Navbar";
import ForgPass from "./Components/ForgettenPassword";
import SigninGoogle from "./Components/signwithgoogle"
import Home  from "./Components/Home";

function App() {
  return (
    <div >
      {/* <Navbar/> */}
      <Routes>
      <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/navbar" element={<Navbar />} />
        <Route exact path="/posts/:id" element={<Posts />} />
        <Route exact path="/forgettenPassword" element={<ForgPass />} />
        <Route exact path="/SigninGoogle" element={<SigninGoogle />} />



      </Routes>
    </div>
  );
}

export default App;
