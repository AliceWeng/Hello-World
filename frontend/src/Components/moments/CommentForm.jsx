import { useState } from "react";
import { useParams } from "react-router-dom";

function CommentForm({moment, setReply, fetchComments}) {
    const [comment, setComment] = useState("");

    const { momentId } = useParams();

    const handleSubmit = async e => {
        e.preventDefault();

        if(!comment) return;
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                moment: moment,
                comment: comment
            })
        });
        setReply(false);
        if(momentId) fetchComments();
    }

    return (
        <div className="center">
            <form onSubmit={handleSubmit}>
                <div className="closeContainer">
                    <button
                        type="button"
                        className="close"
                        aria-label="Close form."
                        onClick={() => setReply(false)}>
                    </button>
                </div>
                <label htmlFor="comment">A penny for your thoughts.</label>
                <textarea
                    id="comment"
                    maxLength="300"
                    spellCheck="false"
                    placeholder="Leave your comment here."
                    onChange={e => setComment(e.target.value)}>
                </textarea>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CommentForm;