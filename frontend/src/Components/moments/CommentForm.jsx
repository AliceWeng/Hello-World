import { useState } from "react";
import { useLocation } from "react-router-dom";

function CommentForm({momentId, fetchComments, setReply}) {
    const [comment, setComment] = useState();

    const location = useLocation();

    const handleSubmit = async e => {
        e.preventDefault();

        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                moment: momentId,
                comment: comment
            })
        });
        let regex = /\/[\w\d]+\//
        if(regex.test(location.pathname)) {
            fetchComments();
        }
        setReply(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment">Leave a comment here.</label>
                <input
                    type="text"
                    id="comment"
                    onChange={e => setComment(e.target.value)}/>
                    
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CommentForm;