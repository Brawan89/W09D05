import { Routes, Route } from "react-router-dom";
import Register from "./Components/Registere";
import Login from "./Components/Login";
import Post from "./Components/Post";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div >
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/navbar" element={<Navbar />} />
        <Route exact path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
