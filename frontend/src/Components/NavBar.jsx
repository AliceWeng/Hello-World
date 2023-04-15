import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import LogOutButton from "./LogOutButton";
import AuthContext from "./context/AuthContext";

function NavBar() {
    const [form, setForm] = useState("");
    const [width, setWidth] = useState(0);
    const [active, setActive] = useState(false);
    const [darkTheme, setDarkTheme] = useState(null);

    const { auth } = useContext(AuthContext);

    document.addEventListener("click", e => {
        if(e.target.closest(".dropdown") === null) setActive(false);
        if(e.target.closest("form") === null && !e.target.matches(".navButton")) setForm("");
    });

    window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
    });

    useEffect(() => {
        setWidth(window.innerWidth);
        let boolean = localStorage.getItem("darkTheme");
        if(boolean === "true") setDarkTheme(true);
        if(boolean === "false") setDarkTheme(false);
    }, []);

    useEffect(() => {
        if(darkTheme !== null) localStorage.setItem("darkTheme", darkTheme);
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
                        {auth
                          ? <p>Welcome, {auth.nickname}!</p>
                          : width > 555
                          ? <>
                                <button className="navButton" onClick={() => setForm("signup")}>Sign up</button>
                                <button className="navButton" onClick={() => setForm("login")}>Log In</button>
                            </>
                          : null}
                        <div className={active ? "dropdown active" : "dropdown"}>
                            <button className="navIcon" onClick={() => setActive(!active)}></button>
                            <div className="menu">
                                {auth ? <Link to={auth.username}><button>Profile</button></Link> : null}
                                <button onClick={() => setDarkTheme(!darkTheme)}>Dark Theme</button>
                                <Link target="_blank" rel="noopener noreferrer" to="https://aliceweng.github.io/Rock-Paper-Scissors"><button>Rock, Paper, Scissors</button></Link>
                                { auth ? <LogOutButton/> : null }
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            {form === "signup" ? <SignUpForm setForm={setForm}/> : form === "login" ? <LogInForm setForm={setForm}/> : null}
        </>
    )
}

export default NavBar;