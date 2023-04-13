import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import LogOutButton from "./LogOutButton";
import AuthContext from "./context/AuthContext";

function NavBar() {
    const [form, setForm] = useState("");
    const [active, setActive] = useState(false);
    const [render, setRender] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);

    const { auth } = useContext(AuthContext);

    document.addEventListener("click", e => {
        if(e.target.closest(".dropdown") === null) setActive(false);
        if(e.target.closest("form") === null && !e.target.matches(".navButton")) setForm("");
    });

    useEffect(() => {
        let boolean = localStorage.getItem("darkTheme");
        if(boolean === "true") setDarkTheme(true);
        if(boolean === "false") setDarkTheme(false);
        setRender(true);
    }, []);

    useEffect(() => {
        if(render) localStorage.setItem("darkTheme", darkTheme);
        darkTheme
            ? document.body.className = "darkTheme"
            : document.body.className = ""
    }, [darkTheme]);
    
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link className="navLogo" to="/">Hello, world!</Link>
                    </li>
                    <li>
                        { auth
                        ? <p>Welcome, {auth.nickname}!</p>
                        : <>
                            <button className="navButton" onClick={() => setForm("signup")}>Sign up</button>
                            <button className="navButton" onClick={() => setForm("login")}>Log In</button>
                          </> }
                        <div className={active ? "dropdown active" : "dropdown"}>
                            <button className="navIcon" onClick={() => setActive(!active)}></button>
                            <div className="menu">
                                { auth ? <Link to={`/${auth.username}`}><button>Profile</button></Link> : null }
                                <button onClick={() => setDarkTheme(!darkTheme)}>Dark Theme</button>
                                <Link to="https://aliceweng.github.io/Rock-Paper-Scissors"><button>Rock, Paper, Scissors</button></Link>
                                { auth ? <LogOutButton/> : null }
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            { form === "signup" ? <SignUpForm setForm={setForm}/> : form === "login" ? <LogInForm setForm={setForm}/> : null }
        </>
    )
}

export default NavBar;