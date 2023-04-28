import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import CommentForm from "./CommentForm";
import EditMomentForm from "./EditMomentForm";
import AuthContext from "../context/AuthContext";

function Moment({moment, setMoment, fetchMoments, comments, setComments, count, setCount, fetchRecentMoments}) {
    const [edit, setEdit] = useState(false);

    const [dots, setDots] = useState(false);

    const [reply, setReply] = useState(false);

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const { username, momentId } = useParams();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if(momentId) {
            setEdit(searchParams.get("edit") === "true");
            setReply(searchParams.get("reply") === "true");
            navigate(`/${moment.user.username}/${moment._id}`);
        }
    }, []);

    useEffect(() => {
        if(edit) setReply(false);
    }, [edit]);

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
            navigate(-2);
        } else if(username) {
            fetchMoments();
        } else {
            fetchRecentMoments();
        }
    }

    const editMoment = () => {
        if(auth && momentId) {
            setEdit(true);
        } else if(auth && !momentId) {
            navigate(`/${moment.user.username}/${moment._id}?edit=true`);
        }
    }

    const checkIfLoggedIn = () => {
        if(auth && momentId) {
            setReply(!reply);
        } else if(auth && !momentId) {
            navigate(`/${moment.user.username}/${moment._id}?reply=true`);
        } else if(!auth) {
            // tell user to log in or sign up.
        }
    }

    let created = new Date(moment.createdAt);
    let updated = new Date(moment.updatedAt);

    return (
        <>
            { edit
            ? <EditMomentForm moment={moment} setMoment={setMoment} setEdit={setEdit}/>
            : 
                <div className="box">
                    <div className="name">
                        <Link className="underline" to={`/${moment.user.username}`}>
                            <p>{moment.user.nickname}</p>
                        </Link>
                        <p>@{moment.user.username}</p>
                        <p>{created.toDateString()}</p>
                    </div>
                    { !auth
                    ? null
                    : auth.username === moment.user.username
                    ? <BsThreeDots className="dots" onClick={() => setDots(!dots)}/>
                    : null }
                    { dots
                    ? <div className="dotsContainer">
                        <button className="edit" onClick={editMoment}>Edit</button>
                        <button className="delete" onClick={deleteMoment}>Delete</button>
                    </div>
                    : null }
                    <div className="shadow"></div>
                    <div className="post">
                        { momentId 
                        ? <p>{moment.post}</p>
                        : <Link className="underline" to={`/${moment.user.username}/${moment._id}`} >
                            <p>{moment.post}</p>
                          </Link> }
                        {moment.createdAt !== moment.updatedAt ? <p>Last updated on {updated.toDateString()}</p> : null}
                        <button className="reply" onClick={() => checkIfLoggedIn()}>
                            <FaReply/>Reply
                        </button>
                    </div>
                </div>
              }
            { reply && auth && <CommentForm moment={moment._id} comments={comments} setComments={setComments} count={count} setCount={setCount} setReply={setReply}/>}
        </>
    )
}

export default Moment;