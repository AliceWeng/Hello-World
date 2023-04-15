import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import MoodForm from "./PostForm";
import Error404 from "./Error404";
import Moment from "./Moment";

function Profile() {
    const [username, setUsername] = useState(null);
    const [moments, setMoments] = useState([]);

    const { auth } = useContext(AuthContext);

    const location = useLocation();

    useEffect(() => {
        setUsername(location.pathname.replace(/\//g, ""));
    }, [location]);
    
    useEffect(() => {
        if(username) {
            const fetchUsername = async () => {
                const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/${username}`);
                const data = await response.text();
                setUsername(data);
                if(data) {
                    const fetchMoments = async () => {
                        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${username}`)
                        const data = await response.json();
                        setMoments(data);
                    }
                    fetchMoments();
                }
            }
            fetchUsername();
        }
    }, [username]);

    let mapMoments;

    if(moments) {
        mapMoments = moments.map((moment, index) => {
            return (
                <Moment moment={moment} index={index} auth={auth}/>
            )
        });
    }

    return (
        <main>
            { !auth ? null : username === auth.username ? <MoodForm/> : null }
            { username ? null : <Error404/>}
            <section className="moments">
                {moments ? mapMoments : <p>No posts yet.</p>}
            </section>
        </main>
    )
}

export default Profile;