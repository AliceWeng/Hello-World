import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Profile from "./Components/Profile";
import Error404 from "./Components/Error404";

function App() {
  return (
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/"/>
          <Route path="/:username" element={<Profile/>}/>
          <Route path="/*" element={<Error404/>}/>
        </Routes>
      </Router>
  );
}

export default App;