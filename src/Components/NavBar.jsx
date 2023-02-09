import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link className="link" to="/">Hello, world!</Link>
                </li>
                <li>
                    <Link className="link" to="/signup">Sign up</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;