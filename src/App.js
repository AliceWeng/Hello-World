import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SignUpForm from "./Components/SignUpForm";
import MoodForm from "./Components/MoodForm";

function App() {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/moods/new" element={<MoodForm/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
