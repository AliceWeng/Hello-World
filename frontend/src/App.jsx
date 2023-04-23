import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import Error404 from "./Components/ErrorPage";
import MomentPage from "./Components/MomentPage";
import ProfilePage from "./Components/ProfilePage";

function App() {
  return (
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/:username" element={<ProfilePage/>}/>
          <Route path="/:username/:momentId" element={<MomentPage/>}/>
          <Route path="/*" element={<Error404/>}/>
        </Routes>
      </Router>
  );
}

export default App;