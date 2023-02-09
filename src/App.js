import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpForm from "./Components/SignUpForm";
import MoodForm from "./Components/MoodForm";
import NavBar from "./Components/NavBar";

function App() {
  return (
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/moods/new" element={<MoodForm/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
        </Routes>
      </Router>
  );
}

export default App;
