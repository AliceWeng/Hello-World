import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link className="link" to="/">Hello, World!</Link>
                </li>
                <li>
                    <Link className="link" to="/signup">Sign Up</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;