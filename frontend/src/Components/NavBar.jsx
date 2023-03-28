import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import AuthContext from "./context/AuthContext";
import LogOutButton from "./LogOutButton";

function NavBar() {
    const { auth } = useContext(AuthContext);

    return (
        <nav>
            <ul>
                <li>
                    <Link className="navLogo" to="/">Hello, world!</Link>
                </li>
                { auth
                ? <li>
                    <p>Welcome, {auth.nickname}!</p>
                    <LogOutButton auth={auth}/>
                  </li> 
                : <li>
                    <Link className="navButton" to="/signup">Sign up</Link>
                    <Link className="navButton" to="/login">Log In</Link>
                  </li>
                }
            </ul>
        </nav>
    )
}

export default NavBar;