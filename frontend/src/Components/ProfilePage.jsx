import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io"
import Moment from "./moments/Moment";
import MomentForm from "./moments/MomentForm";
import AuthContext from "./context/AuthContext";

function ProfilePage() {
    const [user, setUser] = useState();

    const [moments, setMoments] = useState([]);

    const [count, setCount] = useState(0);

    const [create, setCreate] = useState(false);

    const { auth } = useContext(AuthContext);

    const { username } = useParams();

    const navigate = useNavigate();

    const observer = useRef();

    const lastMomentRef = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && moments.length !== count) {
                fetchMoments();
            }
        });
        if(node) observer.current.observe(node);
    }, [moments]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/${username}`)
            .then(response => response.json())
            .then(userData => {
                setUser(userData);
                if(userData) {
                    fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/user/${username}/count`)
                        .then(response => response.json())
                        .then(countData => setCount(countData));
                    fetchMoments();
                }
            });
    }, []);

    const fetchMoments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/user/${username}/?number=${moments.length}`);
        const momentsData = await response.json();
        setMoments([...moments, ...momentsData]);
    }
    
    return (
        <main>
            <div className="width">
                <div className="box">
                    <IoMdArrowRoundBack className="back" onClick={() => navigate(-1)}/>
                </div>
                { user === null
                ? <h1 className="box">Sorry, this account doesn't exist.</h1>
                : !user
                ? null
                : <>
                    <div className="box">
                        <h1>{user.nickname} @{user.username}</h1>
                        {auth && auth.username === user.username && <button className="create" onClick={() => setCreate(!create)}>Create a new moment</button>}
                    </div>
                    {auth && create && <MomentForm fetchMoments={fetchMoments} setCreate={setCreate}/>}
                    { moments.length
                    ? moments.map((moment, index) => {
                        if(moments.length === index + 1) {
                            return (
                                <div ref={lastMomentRef} key={index}>
                                    <Moment moment={moment} fetchMoments={fetchMoments}/>
                                </div>
                            )
                        } else return <Moment moment={moment} key={index} fetchMoments={fetchMoments}/>
                      })
                    : <p className="margin">No moments yet.</p> }
                </> }
            </div>
        </main>
    )
}

export default ProfilePage;