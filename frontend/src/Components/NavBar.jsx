import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import LogInForm from "./LogInForm"
import SignUpForm from "./SignUpForm";
import LogOutButton from "./LogOutButton";
import AuthContext from "./context/AuthContext";

function NavBar() {
    const [form, setForm] = useState("");
    const [active, setActive] = useState(false);
    const [toggle, setToggle] = useState(false);

    const { auth } = useContext(AuthContext);

    document.addEventListener("click", e => {
        if(e.target.closest(".dropdown")) {
            // do nothing.
        } else {
            setActive(false);
        }
    });

    useEffect(() => {
      toggle
        ? document.body.className = "dark"
        : document.body.className = ""
    }, [toggle]);
    
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
                            <button className="dropdownButton" onClick={() => setActive(!active)}></button>
                            <div className="menu">
                                <button className="toggle" onClick={() => setToggle(!toggle)}>Dark Toggle</button>
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