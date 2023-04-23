import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Moment from "./moments/Moment";
import MomentForm from "./moments/MomentForm";
import AuthContext from "./context/AuthContext";

function ProfilePage() {
    const [user, setUser] = useState();

    const [moments, setMoments] = useState();

    const [create, setCreate] = useState(false);

    const { auth } = useContext(AuthContext);

    const { username } = useParams();

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        create
        ? document.body.classList.add("popup")
        : document.body.classList.remove("popup")
    }, [create]);

    const fetchUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/${username}`);
        const userData = await response.json();
        if(userData) fetchMoments(userData._id);
        setUser(userData);
    }

    const fetchMoments = async userId => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/user/${userId}`);
        const momentsData = await response.json();
        setMoments(momentsData); 
    }

    return (
        <main>
            { user === null
            ? <ErrorPage/>
            : !user
            ? null
            : <>
                <div className="flexbox">
                    <h1>{user.nickname} @{user.username}</h1>
                    { !auth
                    ? null
                    : auth._id === user._id
                    ? <button className="create" onClick={() => setCreate(!create)}>Create a new moment</button>
                    : null }
                </div>
                { create
                ? <MomentForm fetchMoments={fetchMoments} userId={auth._id} setCreate={setCreate}/>
                : null }
                { !moments
                ? null
                : moments.length
                ? moments.map((moment, index) => {
                    return (
                        <div className="flexbox" key={index}>
                            <Moment moment={moment} fetchMoments={fetchMoments}/>
                        </div>
                    )
                })
                : <div className="flexbox">
                    <p>No posts yet.</p>
                </div> }
              </> }
        </main>
    )
}

export default ProfilePage;