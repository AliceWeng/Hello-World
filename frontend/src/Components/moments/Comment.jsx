import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import AuthContext from "../context/AuthContext";

function Comment({comment, comments, setComments, count, setCount}) {
    const [dots, setDots] = useState(false);

    const { auth } = useContext(AuthContext);

    document.addEventListener("click", e => {
        if(!e.target.closest(".dots")) setDots(false);
    });

    document.addEventListener("keydown", e => {
        if(e.key === "Escape") setDots(false);
    });

    const deleteComment = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${comment._id}`, {
            method: "DELETE",
            credentials: "include"
        });
        setComments(comments.filter(object => object._id !== comment._id));
        setCount(count - 1);
    }

    let date = new Date(comment.createdAt);

    return (
        <div className="flexbox">
            <div className="moment">
                <div className="name">
                    <Link className="underline" to={`/${comment.user.username}`}>
                        <p>{comment.user.nickname}</p>
                    </Link>
                    <p>@{comment.user.username}</p>
                    <p>{date.toDateString()}</p>
                </div>
                { !auth
                ? null
                : auth.username === comment.user.username
                ? <BsThreeDots className="dots" onClick={() => setDots(!dots)}/>
                : null }
                { dots
                ? <div className="options">
                    <button className="delete" onClick={deleteComment}>Delete</button>
                  </div>
                : null }
                <div className="post comment">
                    <p>{comment.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;