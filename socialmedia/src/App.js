import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './Components/Registere';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
       <Routes>
   
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />

    </Routes>
    </div>
  );
}

export default App;
