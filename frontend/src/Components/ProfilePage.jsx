import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import MomentForm from "./moments/MomentForm";
import Moment from "./moments/Moment";
import Error404 from "./ErrorPage";

function Profile() {
    const [username, setUsername] = useState(null);
    
    const [moments, setMoments] = useState([]);

    const { auth } = useContext(AuthContext);

    const location = useLocation();

    const fetchMoments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/username/${username}`);
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
                {!auth ? null : auth.username !== username ? null : <MomentForm fetchMoments={fetchMoments}/>}
                    {moments.length
                        ? moments.map((moment, index) => {
                            return (
                                <div className="flexbox">
                                    <Moment moment={moment} key={index} fetchMoments={fetchMoments}/>
                                </div>
                            )
                          })
                        : <div className="flexbox">
                            <p>No posts yet.</p>
                          </div>
                        }
              </>
            : <Error404/>}
        </main>
    )
}

export default Profile;