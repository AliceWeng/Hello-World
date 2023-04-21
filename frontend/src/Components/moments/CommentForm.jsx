import { useState } from "react";
import { useLocation } from "react-router-dom";

function CommentForm({momentId, setReply}) {
    const [comment, setComment] = useState("");

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
        }
        setReply(false);
    }

    return (
        <div className="flexbox c">
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment">A penny for your thoughts.</label>
                <textarea
                    id="comment"
                    maxLength="300"
                    spellCheck="false"
                    placeholder="Leave a comment here."
                    onChange={e => setComment(e.target.value)}>
                </textarea>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CommentForm;