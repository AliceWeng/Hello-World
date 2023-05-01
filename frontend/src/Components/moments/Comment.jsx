import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import AuthContext from "../context/AuthContext";

function Comment({comment, comments, setComments, commentsCount, setCommentsCount}) {
    const [dots, setDots] = useState(false);

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const escape = e => {
            if(e.key === "Escape") setDots(false);
        }
        const click = e => {
            if(!e.target.closest(".dots")) setDots(false);
        }
        document.addEventListener("click", click);
        document.addEventListener("keydown", escape);
        return () => {
            document.removeEventListener("click", click);
            document.removeEventListener("keydown", escape);
        }
    });

    const deleteComment = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${comment._id}`, {
            method: "DELETE",
            credentials: "include"
        });
        setCommentsCount(commentsCount - 1);
        setComments(comments.filter(object => object._id !== comment._id));
    }

    let created = new Date(comment.createdAt);

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <article className="box">
            <div className="name">
                <Link className="underline" to={`/${comment.user.username}`}>
                    <p>{comment.user.nickname}</p>
                </Link>
                <p>@{comment.user.username}</p>
                <p>
                    {month[created.getMonth()]} {created.getDate()}
                    {new Date().getFullYear() !== created.getFullYear() && `, ${created.getFullYear()}`}
                </p>
            </div>
            { auth && auth.username === comment.user.username && <BsThreeDots className="dots" onClick={() => setDots(!dots)}/> }
            { dots &&
              <div className="dotsContainer">
                <button className="delete" onClick={deleteComment}>Delete</button>
              </div> }
            <div className="comment">
                <p>{comment.comment}</p>
            </div>
        </article>
    )
}

export default Comment;