import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <nav>
            <ul>
                <li>
                    <Link className="home" to="/">Hello, world!</Link>
                </li>
                { loggedIn
                ? null 
                : <li>
                    <Link className="navButton" to="/signup">Sign up</Link>
                    <Link className="navButton" to="/login">Log In</Link>
                  </li> }
            </ul>
        </nav>
    )
}

export default NavBar;