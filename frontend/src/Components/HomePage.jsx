import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "./moments/Moment";

function HomePage() {
    const [moments, setMoments] = useState();

    useEffect(() => {
        fetchTodaysMoments();
    }, []);

    const fetchTodaysMoments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/recent`);
        const todaysData = await response.json();
        setMoments(todaysData);
    }

    return (
        <main>
            <Link target="_blank" rel="noopener noreferrer" to="https://aliceweng.github.io/Rock-Paper-Scissors">
                <button>Rock, Paper, Scissors</button>
            </Link>
            <section className="flexbox">
                <h1>Today's Moments</h1>
                { !moments
                ? null
                : moments.length
                ? moments.map((moment, index) => {
                    return (
                        <Moment moment={moment} key={index}/>
                    )
                  })
                : <div>
                    <p>There aren't any yet.</p>
                  </div> }
            </section>
        </main>
    )
}

export default HomePage;