import { useState, useEffect, useRef, useCallback } from "react";
import Moment from "./moments/Moment";

function HomePage() {
    const [moments, setMoments] = useState([]);
    
    const [momentsCount, setMomentsCount] = useState(0);

    const [query, setQuery] = useState("");

    const observer = useRef();

    const lastMomentRef = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && moments.length !== momentsCount) {
                fetchRecentMoments();
            }
        });
        if(node) observer.current.observe(node);
    }, [moments]);

    useEffect(() => {
        fetchRecentMoments();
    }, []);

    const fetchRecentMoments = () => {
        fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/?number=${moments.length}&search=${query}`)
        .then(response => response.json())
        .then(data => {
            setMomentsCount(data.count);
            setMoments([...moments, ...data.moments]);
        });
    }

    return (
        <main>
            <div className="width">
                <h1>Recent Moments</h1>
                { moments.length
                ? moments.map((moment, index) => {
                    if(moments.length === index + 1) {
                        return (
                            <div ref={lastMomentRef} key={index}>
                                <Moment moment={moment} moments={moments} setMoments={setMoments} momentsCount={momentsCount} setMomentsCount={setMomentsCount}/>
                            </div>
                        )
                    } else return <Moment moment={moment} key={index} moments={moments} setMoments={setMoments} momentsCount={momentsCount} setMomentsCount={setMomentsCount}/>
                  })
                : <p className="margin">¯\_(ツ)_/¯</p> }
            </div>
        </main>
    )
}

export default HomePage;