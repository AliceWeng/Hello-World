import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link className="home" to="/">Hello, world!</Link>
                </li>
                <li>
                    <Link className="moods" to="/moods">Moods</Link>
                </li>
                <li>
                    <Link className="navButton" to="/signup">Sign up</Link>
                    <Link className="navButton" to="/login">Log In</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;