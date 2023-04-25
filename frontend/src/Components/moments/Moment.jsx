import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import CommentForm from "./CommentForm";
import AuthContext from "../context/AuthContext";

function Moment({moment, fetchMoments, fetchComments, fetchRecentMoments}) {
    const [dots, setDots] = useState(false);

    const [reply, setReply] = useState(false);

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const { username, momentId } = useParams();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        setReply(searchParams.get("reply") === "true");
    }, []);

    document.addEventListener("click", e => {
        if(!e.target.closest(".dots")) setDots(false);
    });

    document.addEventListener("keydown", e => {
        if(e.key === "Escape") setDots(false);
    });

    const deleteMoment = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if(momentId) {
            navigate(-1);
        } else if(username) {
            fetchMoments(auth._id);
        } else {
            fetchRecentMoments();
        }
    }

    const checkIfLoggedIn = () => {
        if(auth && momentId) {
            setReply(!reply);
        } else if(auth && !momentId) {
            navigate(`/${moment.user.username}/${moment._id}/?reply=true`);
        } else if(!auth) {
            // tell user to log in or sign up.
        }
    }

    let date = new Date(moment.createdAt);

    return (
        <>
            <div className="flexbox">
                <div className="moment">
                    <div className="name">
                        <Link className="underline" to={`/${moment.user.username}`}>
                            <p>{moment.user.nickname}</p>
                        </Link>
                        <p>@{moment.user.username}</p>
                        <p>{date.toDateString()}</p>
                    </div>
                    { !auth
                    ? null
                    : auth._id === moment.user._id
                    ? <BsThreeDots className="dots" onClick={() => setDots(!dots)}/>
                    : null }
                    { dots
                    ? <button className="delete" onClick={deleteMoment}>Delete</button>
                    : null }
                    <div className="post">
                        { momentId 
                        ? <p>{moment.post}</p>
                        : <Link className="underline" to={`/${moment.user.username}/${moment._id}`} >
                            <p>{moment.post}</p>
                        </Link> }
                        <button className="reply" onClick={() => checkIfLoggedIn()}>
                            <FaReply/>Reply
                        </button>
                    </div>
                </div>
            </div>
            { reply && auth
            ? <CommentForm moment={moment._id} setReply={setReply} fetchComments={fetchComments}/>
            : null }
        </>
    )
}

export default Moment;