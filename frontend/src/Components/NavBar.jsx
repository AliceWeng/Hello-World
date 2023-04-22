import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DarkTheme from "./users/DarkTheme";
import LogInForm from "./users/LogInForm";
import SignUpForm from "./users/SignUpForm";
import LogOutButton from "./users/LogOutButton";
import AuthContext from "./context/AuthContext";

function NavBar() {
    const [form, setForm] = useState("");
    const [width, setWidth] = useState(0);
    const [active, setActive] = useState(false);

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
    }, []);

    useEffect(() => {
        if(form) {
            document.body.classList.add("popup");
        } else {
            document.body.classList.remove("popup");
        }

    }, [form]);
    
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
                    <DarkTheme/>
                    { auth ? <LogOutButton setActive={setActive} setAuth={setAuth}/> : null }
                </div>
            </div>
            {form === "signup" ? <SignUpForm setForm={setForm}/> : form === "login" ? <LogInForm setForm={setForm} setAuth={setAuth}/> : null}
        </>
    )
}

export default NavBar;