import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import MoodForm from "./Components/MoodForm";
import NavBar from "./Components/NavBar";

function App() {
  return (
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/login" element={<LogInForm/>}/>
          <Route path="/moods/new" element={<MoodForm />}/>
          <Route path="/signup" element={<SignUpForm />}/>
        </Routes>
      </Router>
  );
}

export default App;
