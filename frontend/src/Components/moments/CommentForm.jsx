import { useState, useEffect, useRef } from "react";

function CommentForm({moment, setReply, fetchComments}) {
    const [comment, setComment] = useState("");

    const textareaRef = useRef();

    useEffect(() => {
        textareaRef.current.focus();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(!comment || comment.length > 300) {
            textareaRef.current.focus();
            return;
        }
        setReply(false);
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
        fetchComments();
    }

    return (
        <div className="flexbox">
            <form className="moment" onSubmit={handleSubmit}>
                <label htmlFor="comment">A penny for your thoughts.</label>
                <textarea
                    id="comment"
                    maxLength="300"
                    ref={textareaRef}
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