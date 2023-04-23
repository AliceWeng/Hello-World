import { Link } from "react-router-dom";

function Error404() {
    return (
        <main>
            <div className="flexbox">
                <h1>404 : Page Not Found</h1>
                <p>Let's get you back <Link className="link" to="/">home</Link>.</p>
            </div>
        </main>
    )
}

export default Error404;