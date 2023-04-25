import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io"
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

    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

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
            <div className="flexbox">
                <div className="backContainer moment">
                    <IoMdArrowRoundBack className="back" onClick={() => navigate(-1)}/>
                </div>
            </div>
            { user === null
            ? <div className="flexbox">
                <h1 className="moment">Sorry, this account doesn't exist.</h1>
              </div>
            : !user
            ? null
            : <>
                <div className="flexbox">
                    <h1>{user.nickname} @{user.username}</h1>
                </div>
                <div className="flexbox">
                    { !auth
                    ? null
                    : auth._id === user._id
                    ? <button className="create" onClick={() => setCreate(!create)}>Create a new moment</button>
                    : null }
                </div>
                { create && auth
                ? <div className="flexbox">
                    <div className="moment">
                        <MomentForm fetchMoments={fetchMoments} userId={auth._id} setCreate={setCreate}/>
                    </div>
                  </div>
                : null }
                { !moments
                ? null
                : moments.length
                ? <section>{moments.map((moment, index) => {
                    return (
                        <div className="flexbox" key={index}>
                            <Moment moment={moment} fetchMoments={fetchMoments}/>
                        </div>
                    )
                  })}</section>
                : <div className="flexbox">
                    <p>No posts yet.</p>
                </div> }
              </> }
        </main>
    )
}

export default ProfilePage;