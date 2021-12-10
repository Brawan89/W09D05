import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './Components/Registere';

function App() {
  return (
    <div className="App">
       <Routes>
   
      <Route exact path="/register" element={<Register />} />
    </Routes>
    </div>
  );
}

export default App;
