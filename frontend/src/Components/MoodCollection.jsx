import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MoodCollection() {
    const [moods, setMoods] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_URI}/api/moods`)
            .then(response => response.json())
            .then(data => setMoods(data));
    }, []);

    let mapMoods = moods.map((mood, index) => {
        return (
            <div key={index}>

            </div>
        )
    });

    return (
        <div>
            <Link to="/moods/new">New Mood</Link>
            {mapMoods}
        </div>
    )
}

export default MoodCollection;