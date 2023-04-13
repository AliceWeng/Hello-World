import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./Components/Profile";
import MoodForm from "./Components/MoodForm";
import NavBar from "./Components/NavBar";
import MoodCollection from "./Components/MoodCollection";
import Error404 from "./Components/Error404";


function App() {
  return (
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MoodCollection/>}/>
          <Route path="/moods" element={<MoodCollection/>}/>
          <Route path="/:username" element={<Profile/>}/>
          <Route path="/*" element={<Error404/>}/>
        </Routes>
      </Router>
  );
}

export default App;