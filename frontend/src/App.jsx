import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import ProfilePage from "./Components/ProfilePage";
import Error404 from "./Components/ErrorPage";
import MomentPage from "./Components/MomentPage";
import HomePage from "./Components/HomePage";

function App() {
  return (
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/:username" element={<ProfilePage/>}/>
          <Route path="/:username/:moment" element={<MomentPage/>}/>
          <Route path="/*" element={<Error404/>}/>
        </Routes>
      </Router>
  );
}

export default App;