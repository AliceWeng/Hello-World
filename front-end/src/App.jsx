import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import MoodForm from "./Components/MoodForm";
import NavBar from "./Components/NavBar";
import MoodCollection from "./Components/MoodCollection";
import Error404 from "./Components/Error40"

function App() {
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
      </Router>
  );
}

export default App;