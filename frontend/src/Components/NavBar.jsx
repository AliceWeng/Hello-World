import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import LogInForm from "./LogInForm"
import SignUpForm from "./SignUpForm";
import LogOutButton from "./LogOutButton";
import AuthContext from "./context/AuthContext";

function NavBar() {
    const [form, setForm] = useState("");
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if(auth) {
            setForm("");
        }
    }, []);

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link className="navLogo" to="/">Hello, world!</Link>
                    </li>
                    { auth
                        ? <li>
                            <p>Welcome, {auth.nickname}!</p>
                            <LogOutButton/>
                        </li> 
                        : <li>
                            <button className="navButton" onClick={() => setForm("signup")}>Sign up</button>
                            <button className="navButton" onClick={() => setForm("login")}>Log In</button>
                        </li>
                    }
                </ul>
            </nav>
            {form === "signup" ? <SignUpForm/> : form === "login" ? <LogInForm/> : null}
        </>
    )
}

export default NavBar;