import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import CommentForm from "./CommentForm";
import AuthContext from "../context/AuthContext";

function Moment({moment, fetchMoments, fetchComments}) {
    const [dots, setDots] = useState(false);

    const [reply, setReply] = useState(false);

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const { username, momentId } = useParams();

    document.addEventListener("click", e => {
        if(!e.target.closest("form") && !e.target.matches(".reply")) setReply(false);
        if(!e.target.closest(".dots")) setDots(false);
    });

    document.addEventListener("keydown", e => {
        if(e.key === "Escape") setReply(false);
    });

    useEffect(() => {
        reply
        ? document.body.classList.add("popup")
        : document.body.classList.remove("popup")
    }, [reply]);

    const deleteMoment = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if(momentId) {
            navigate(`/${auth.username}`);
        } else if(username) {
            fetchMoments(auth._id);
        }
    }

    let date = new Date(moment.createdAt);

    const checkIfLoggedIn = () => {
        if(auth) {
            setReply(!reply);
        } else {
            // tell them to log in or sign up.
        }
    }

    return (
        <>
            <div className="moment">
                <div className="name">
                    <Link className="nameLink" to={`/${moment.user.username}`}>
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
                </div>
                <button className="reply" onClick={() => checkIfLoggedIn()}>
                    <FaReply/>Reply
                </button>
            </div>
            { reply
            ? <CommentForm moment={moment._id} setReply={setReply} fetchComments={fetchComments}/>
            : null }
        </>
    )
}

export default Moment;