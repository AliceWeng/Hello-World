import { useState, useEffect } from "react";
import Moment from "./moments/Moment";

function HomePage() {
    const [moments, setMoments] = useState([]);
    
    const [searchCount, setSearchCount] = useState(0);

    const [query, setQuery] = useState("");

    useEffect(() => {
        fetchRecentMoments();
    }, []);

    useEffect(() => {
        
    }, [query]);

    const fetchRecentMoments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments`);
        const recentData = await response.json();
        setMoments(recentData);
    }

    return (
        <main>
            <div className="width">
                <form>
                <label>Search</label>
                <input
                    type="text"
                    onChange={e => setQuery(e.target.value)}
                    placeholder="What are you looking for?"/>
                </form>
                <h1>Recent Moments</h1>
                { moments.length
                ? moments.map((moment, index) => <Moment moment={moment} key={index}/>)
                : <p className="margin">¯\_(ツ)_/¯</p> }
            </div>
        </main>
    )
}

export default HomePage;