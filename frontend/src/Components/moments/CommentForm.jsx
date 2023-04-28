import { useState, useEffect, useRef } from "react";

function CommentForm({auth, moment, comments, setComments, count, setCount, setReply}) {
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
        setComments([{...newCommentData, user: {nickname: auth.nickname, username: auth.username}}, ...comments]);
        setCount(count + 1);
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
                    placeholder="Enter your comment here."
                    onChange={e => setComment(e.target.value)}>
                </textarea>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CommentForm;