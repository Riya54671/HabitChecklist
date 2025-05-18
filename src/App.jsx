
import './App.css'
import Home from "./Home.jsx";
import Progress from "./Progress.jsx";
import AddHabit from "./AddHabit.jsx";
import { Routes , Route } from "react-router-dom";


function App() {

  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/add" element={<AddHabit />} />
      </Routes>
  )
}

export default App
