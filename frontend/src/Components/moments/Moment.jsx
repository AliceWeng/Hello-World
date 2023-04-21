import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaReply } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs"
import CommentForm from "./CommentForm";
import AuthContext from "../context/AuthContext";

function Moment({moment, fetchMoments}) {
    const [reply, setReply] = useState(false);
    const [dots, setDots] = useState(false);
    const { auth } = useContext(AuthContext);

    const deleteMoment = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "DELETE"
        })
        fetchMoments();
    }
    
    document.addEventListener("click", e => {
        if(e.target.closest(".dots") === null) setDots(false);
    });

    let date = new Date(moment.createdAt);
    return (
            <div className="moment">
                <div className="nameContainer">
                    <div className="name">
                        <Link className="nameLink" to={`/${moment.user.username}`}>
                            <p>{moment.user.nickname}</p>
                        </Link>
                        <p>@{moment.user.username}</p>
                        <p>{date.toDateString()}</p>
                    </div>
                    {!auth ? null : auth._id === moment.user._id ? <BsThreeDots className="dots" onClick={() => setDots(!dots)}/> : null}
                    {dots ? <button className="delete" onClick={deleteMoment}>Delete</button> : null}
                </div>
                <div className="post">
                    <Link className="postLink" to={`/${moment.user.username}/${moment._id}`} >
                        <p>{moment.post}</p>
                    </Link>
                    <button className="reply" onClick={() => setReply(!reply)}><FaReply/>Reply</button>
                </div>
                {reply ? <CommentForm momentId={moment._id} setReply={setReply}/> : null}
            </div>
    )
}

export default Moment;