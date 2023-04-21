import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LogInForm from "./users/LogInForm";
import SignUpForm from "./users/SignUpForm";
import LogOutButton from "./users/LogOutButton";
import AuthContext from "./context/AuthContext";

function NavBar() {
    const [form, setForm] = useState("");
    const [width, setWidth] = useState(0);
    const [active, setActive] = useState(false);
    const [darkTheme, setDarkTheme] = useState(null);

    const { auth, setAuth } = useContext(AuthContext);

    document.addEventListener("click", e => {
        if(e.target.closest(".dropdown") === null && !e.target.matches(".navIcon")) setActive(false);
        if(e.target.closest("form") === null && !e.target.matches(".navButton")) setForm("");
    });

    document.addEventListener("keydown", e => {
        if(e.key === "Escape") setForm("");
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
        if(form) {
            document.body.classList.add("popup");
        } else {
            document.body.classList.remove("popup");
        }

    }, [form]);

    useEffect(() => {
        if(darkTheme !== null) localStorage.setItem("darkTheme", darkTheme);
        darkTheme
            ? document.body.classList.add("darkTheme")
            : document.body.classList.remove("darkTheme")
    }, [darkTheme]);
    
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link className="navLogo" to="/">
                            {!auth ? "Hello, world!" : `Hello, ${auth.nickname}!`}
                        </Link>
                    </li>
                    <li>
                        {auth
                          ? null
                          : width > 555
                          ? <>
                                <button className="navButton" onClick={() => setForm("signup")}>Sign up</button>
                                <button className="navButton" onClick={() => setForm("login")}>Log In</button>
                            </>
                          : null}
                            <button className="navIcon" onClick={() => setActive(!active)}></button>

                    </li>
                </ul>
            </nav>
            <div className={active ? "dropdown active" : "dropdown"}>
                <div className="menu">
                    {auth ? <Link to={`/${auth.username}`}><button onClick={() => setActive("")}>Profile</button></Link> : null}
                    <button onClick={() => setDarkTheme(!darkTheme)}>Dark Theme</button>
                    <Link target="_blank" rel="noopener noreferrer" to="https://aliceweng.github.io/Rock-Paper-Scissors"><button>Rock, Paper, Scissors</button></Link>
                    { auth ? <LogOutButton setActive={setActive} setAuth={setAuth}/> : null }
                </div>
            </div>
            {form === "signup" ? <SignUpForm setForm={setForm}/> : form === "login" ? <LogInForm setForm={setForm} setAuth={setAuth}/> : null}
        </>
    )
}

export default NavBar;