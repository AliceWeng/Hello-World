import { Link } from "react-router-dom";

function HomePage() {
    return (
        <main>
            <Link target="_blank" rel="noopener noreferrer" to="https://aliceweng.github.io/Rock-Paper-Scissors">
                <button>Rock, Paper, Scissors</button>
            </Link>
        </main>
    )
}

export default HomePage;