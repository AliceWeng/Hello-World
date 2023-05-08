import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <main>
            <div className="width">
                <h1>404 : Page Not Found</h1>
                <p>Oh no! Let's fly you back <Link className="link" to="/">home</Link>.</p>
                <img src={require("../img/bird.png")} alt="A mechanical bird with gears behind it."/>
                <p>This image was created by <Link className="link" target="_blank" rel="noopener noreferrer" to="https://github.com/AishaRincon">Aisha Rincon</Link> using <Link className="link" target="_blank" rel="noopener noreferrer" to="https://www.canva.com/">Canva</Link>.</p>
            </div>
        </main>
    )
}

export default ErrorPage;