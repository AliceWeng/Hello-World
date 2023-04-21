import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import AuthContext from "../context/AuthContext";

function Comment({comment, fetchComments}) {
    const [dots, setDots] = useState(false);
    const { auth } = useContext(AuthContext);

    
    document.addEventListener("click", e => {
        if(e.target.closest(".dots") === null) setDots(false);
    });

    const deleteComment = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${comment._id}`, {
            method: "DELETE"
        });
        fetchComments();
    }

    let date = new Date(comment.createdAt);

    return (
            <div className="moment">
                <div className="nameContainer">
                    <div className="name">
                        <Link className="nameLink" to={`/${comment.user.username}`}>
                            <p>{comment.user.nickname}</p>
                        </Link>
                        <p>@{comment.user.username}</p>
                        <p>{date.toDateString()}</p>
                    </div>
                    {!auth ? null : auth._id === comment.user._id ? <BsThreeDots className="dots" onClick={() => setDots(!dots)}/> : null}
                    {dots ? <button className="delete" onClick={deleteComment}>Delete</button> : null}
                </div>
                <div className="post">
                    <p>{comment.comment}</p>
                </div>
            </div>
    )
}

export default Comment;
