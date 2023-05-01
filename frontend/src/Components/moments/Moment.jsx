import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import CommentForm from "./CommentForm";
import EditMomentForm from "./EditMomentForm";
import AuthContext from "../context/AuthContext";

function Moment({moment, setMoment, comments, setComments, commentsCount, setCommentsCount, moments, setMoments, momentsCount, setMomentsCount}) {
    const [edit, setEdit] = useState(false);

    const [dots, setDots] = useState(false);

    const [reply, setReply] = useState(false);

    const { auth, setForm } = useContext(AuthContext);

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
            setMomentsCount(momentsCount - 1);
            setMoments(moments.filter(object => object._id !== moment._id));
        }
    }

    const replyMoment = () => {
        if(auth && momentId) {
            setReply(!reply);
        } else if(auth && !momentId) {
            navigate(`/${moment.user.username}/${moment._id}?reply=true`);
        } else if(!auth) {
            setForm("login");
        }
    }

    let created = new Date(moment.createdAt);

    let twentyfourHours = created.getTime() + (24 * 3600000);

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const editMoment = () => {
        if(new Date().getTime() < twentyfourHours) {
            if(auth && momentId) {
                setEdit(true);
            } else if(auth && !momentId) {
                navigate(`/${moment.user.username}/${moment._id}?edit=true`);
            }
        }
    }

    return (
        <>
            { auth && edit
            ? <EditMomentForm moment={moment} setMoment={setMoment} setEdit={setEdit}/>
            : <article className="box">
                <div className="name">
                    <Link className="underline" to={`/${moment.user.username}`}>
                        <p>{moment.user.nickname}</p>
                    </Link>
                    <p>@{moment.user.username}</p>
                    <p>
                        {month[created.getMonth()]} {created.getDate()}
                        {new Date().getFullYear() !== created.getFullYear() && `, ${created.getFullYear()}`}
                    </p>
                </div>
                { auth && auth.username === moment.user.username && <BsThreeDots className="dots" onClick={() => setDots(!dots)}/> }
                { dots &&
                  <div className="dotsContainer">
                    {new Date().getTime() < twentyfourHours && <button className="edit" onClick={editMoment}>Edit</button>}
                    <button className="delete" onClick={deleteMoment}>Delete</button>
                  </div> }
                <div className="post">
                    { momentId 
                    ? <p>{moment.post}</p>
                    : <Link className="underline" to={`/${moment.user.username}/${moment._id}`} >
                        <p>{moment.post}</p>
                      </Link> }
                    <button className="reply formButton" onClick={replyMoment}><FaReply/>Reply</button>
                </div>
              </article> }
            { auth && reply && <CommentForm moment={moment._id} comments={comments} setComments={setComments} commentsCount={commentsCount} setCommentsCount={setCommentsCount} reply={reply} setReply={setReply}/> }
        </>
    )
}

export default Moment;