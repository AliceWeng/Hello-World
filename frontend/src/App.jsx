import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import MoodForm from "./Components/MoodForm";
import NavBar from "./Components/NavBar";
import MoodCollection from "./Components/MoodCollection";
import Error404 from "./Components/Error404"

function App() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if(!toggle) {
      document.body.className = "";
    }
    if(toggle) {
      document.body.className = "dark";
    }
  }, [toggle]);

  return (
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MoodCollection />}/>
          <Route path="/signup" element={<SignUpForm />}/>
          <Route path="/login" element={<LogInForm />}/>
          <Route path="/moods" element={<MoodCollection />}/>
          <Route path="/moods/new" element={<MoodForm />}/>
          <Route path="/*" component={<Error404/>}/>
        </Routes>
        <div onClick={() => setToggle(!toggle)}>hi</div>
      </Router>
  );
}

export default App;