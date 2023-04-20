import { Link } from "react-router-dom";
import ohno from "../img/ohno.gif";

function Error404() {
    return (
        <main>
            <div className="fourofour">
                <h1>404 : Page Not Found</h1>
                <img className="ohno" src={ohno}/>
                <p>Let's get you back <Link className="link" to="/">home</Link>.</p>
            </div>
        </main>
    )
}

export default Error404;