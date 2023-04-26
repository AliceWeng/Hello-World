import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Loading from "./Components/Loading";

const HomePage = lazy(() => import("./Components/HomePage"));
const ProfilePage = lazy(() => import("./Components/ProfilePage"));
const MomentPage = lazy(() => import("./Components/MomentPage"));
const ErrorPage = lazy(() => import("./Components/ErrorPage"));

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<NavPage/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/:username" element={<ProfilePage/>}/>
            <Route path="/:username/:momentId" element={<MomentPage/>}/>
            <Route path="/*" element={<ErrorPage/>}/>
          </Route>
        </Routes>
      </Router>
  );
}

function NavPage() {
  return (
    <>
      <NavBar/>
      <Suspense fallback={<Loading/>}>
        <Outlet/>
      </Suspense>
    </>
  )
}

export default App;