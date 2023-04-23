import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CgLogIn, CgLogOut, CgProfile } from "react-icons/cg";
import DarkTheme from "./users/DarkTheme";
import LogInForm from "./users/LogInForm";
import SignUpForm from "./users/SignUpForm";
import AuthContext from "./context/AuthContext";

function NavBar() {
    const [form, setForm] = useState("");

    const [dropdown, setDropdown] = useState(false);

    const { auth, setAuth } = useContext(AuthContext);

    document.addEventListener("click", e => {
        if(!e.target.closest(".toggleContainer") && !e.target.matches(".menu") && !e.target.matches(".navIcon")) setDropdown(false);
        if(!e.target.closest("form") && !e.target.matches(".navButton") && !e.target.matches(".menuButton")) setForm("");
    });

    document.addEventListener("keydown", e => {
        if(e.key === "Escape") {
            setDropdown(false);
            setForm("");
        }
    });

    useEffect(() => {
        form
        ? document.body.classList.add("popup")
        : document.body.classList.remove("popup")
    }, [form]);

    const logout = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/auth`, {
            method: "DELETE",
            credentials: "include"
        });
        setAuth("");
    }
    
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link className="navLogo" to="/">
                            { auth === undefined ? "Hello" : !auth ? "Hello, world!" : `Hello, ${auth.nickname}!` }
                        </Link>
                    </li>
                    <li>
                        { auth === undefined || auth ? null
                        : <>
                            <button className="navButton" onClick={() => setForm("signup")}>Sign up</button>
                            <button className="navButton" onClick={() => setForm("login")}>Log In</button>
                          </> }
                        <button className="navIcon" onClick={() => setDropdown(!dropdown)}></button>
                    </li>
                </ul>
            </nav>
            <div className={dropdown ? "menu active" : "menu"}>
                { auth
                ? <Link className="underline" to={`/${auth.username}`}>
                    <button><CgProfile className="icon"/>Profile</button>
                  </Link>
                : null }
                <DarkTheme/>
                { auth
                ? <button onClick={logout}><CgLogOut className="icon"/>Log Out</button>
                : <button className="menuButton" onClick={() => setForm("login")}><CgLogIn className="icon"/>Log In</button> }
            </div>
            <div className="shadow"></div>
            { form === "signup"
            ? <SignUpForm setForm={setForm}/>
            : form === "login"
            ? <LogInForm setForm={setForm} setAuth={setAuth}/>
            : null }
        </>
    )
}

export default NavBar;