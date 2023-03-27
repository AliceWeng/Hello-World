import { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import AuthContext from "./context/AuthContext";

function NavBar() {

    const { auth } = useContext(AuthContext);

    let authentication;

    if(auth) {
        authentication = (
            <li>
                Welcome, {auth.nickname}!
            </li>
        )
    } else {
        authentication = (
            <>
                <li>
                    <Link className="navButton" to="/signup">Sign up</Link>
                    <Link className="navButton" to="/login">Log In</Link>
                </li>
            </>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link className="navLink" to="/">Hello, world!</Link>
                </li>
                <li>
                    <Link className="navLink" to="/moods">Moods</Link>
                </li>
                {authentication}
            </ul>
        </nav>
    )
}

export default NavBar;