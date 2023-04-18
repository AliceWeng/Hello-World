import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import PostForm from "./moments/MomentForm";
import Moment from "./moments/Moment";
import Error404 from "./Error404";

function Profile() {
    const [username, setUsername] = useState(null);
    
    const [moments, setMoments] = useState([]);

    const { auth } = useContext(AuthContext);

    const location = useLocation();

    const fetchMoments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${username}`)
        const momentsData = await response.json();
        setMoments(momentsData);
    }

    useEffect(() => {
        setUsername(location.pathname.replace(/\//g, ""));
    }, [location]);
    
    useEffect(() => {
        if(username) {
            const fetchUsername = async () => {
                const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/${username}`);
                const usernameData = await response.text();
                setUsername(usernameData);
                if(usernameData) {
                    fetchMoments();
                }
            }
            fetchUsername();
        }
    }, [username]);

    return (
        <main>
            {username
            ? <>
                {!auth ? null : auth.username !== username ? null : <PostForm fetchMoments={fetchMoments}/>}
                <section className="moments">
                    {moments.length
                        ? moments.map((moment, index) => <Moment moment={moment} key={index} auth={auth} fetchMoments={fetchMoments}/>)
                        : <p>No posts yet.</p>}
                </section>
              </>
            : <Error404/>}
        </main>
    )
}

export default Profile;