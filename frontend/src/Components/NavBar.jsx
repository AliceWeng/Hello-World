import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {

    let authentication = (
        <>
            <li>
                <Link className="navButton" to="/signup">Sign up</Link>
                <Link className="navButton" to="/login">Log In</Link>
            </li>
        </>
    )

    /* if(user) {
        authentication = (
            <li>
                Welcome, {user.nickname}!
            </li>
        )
    } */

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