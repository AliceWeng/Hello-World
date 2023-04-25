import { Link } from "react-router-dom";

function Error404() {
    return (
        <main>
            <h1>404 : Page Not Found</h1>
            <p>Let's get you back <Link className="link" to="/">home</Link>.</p>
        </main>
    )
}

export default Error404;