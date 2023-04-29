import { useState, useEffect, useRef } from "react";

function CommentForm({moment, comments, setComments, commentsCount, setCommentsCount, setReply}) {
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
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments`, {
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
        const newCommentData = await response.json();
        setCommentsCount(commentsCount + 1);
        setComments([newCommentData, ...comments]);
    }

    return (
        <form className="box" onSubmit={handleSubmit}>
            <label htmlFor="comment">A penny for your thoughts.</label>
            <textarea
                id="comment"
                maxLength="300"
                ref={textareaRef}
                spellCheck="false"
                placeholder="Enter your comment here."
                onChange={e => setComment(e.target.value)}>
            </textarea>
            <input type="submit"/>
        </form>
    )
}

export default CommentForm;