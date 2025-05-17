
import './App.css'
import Home from "./Home.jsx";
import Progress from "./Progress.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  )
}

export default App
