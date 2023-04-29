import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "./moments/Moment";

function HomePage() {
    const [moments, setMoments] = useState();

    useEffect(() => {
        fetchRecentMoments();
    }, []);

    const fetchRecentMoments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments`);
        const recentData = await response.json();
        setMoments(recentData);
    }
    
    return (
        <main>
            <div className="width">
                <Link target="_blank" rel="noopener noreferrer" to="https://aliceweng.github.io/Rock-Paper-Scissors/">
                    <button>Rock, Paper, Scissors</button>
                </Link>
                <Link target="_blank" rel="noopener noreferrer" to="https://buck-it-seven.vercel.app/">
                    <button>Buck It</button>
                </Link>
                <h1>Recent Moments</h1>
                { !moments
                ? null
                : moments.length
                ? moments.map((moment, index) => <Moment moment={moment} key={index}/>)
                : <p className="margin">¯\_(ツ)_/¯</p> }
            </div>
        </main>
    )
}

export default HomePage;