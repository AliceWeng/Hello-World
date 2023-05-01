import { useState, useEffect, useRef } from "react";

function CommentForm({moment, comments, setComments, commentsCount, setCommentsCount, reply, setReply}) {
    const [comment, setComment] = useState("");

    const [textareaFocus, setTextareaFocus] = useState(false);

    const textareaRef = useRef();
    const formRef = useRef();

    useEffect(() => {
        let manualSubmit = e => {
            if(e.key === "Enter" && textareaFocus) {
                e.preventDefault();
                formRef.current.requestSubmit();
            }
        }
        document.addEventListener("keydown", manualSubmit);
        return () => {
            document.removeEventListener("keydown", manualSubmit);
        }
    });

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
        <form ref={formRef} className="box" onSubmit={handleSubmit}>
            <label htmlFor="comment">A penny for your thoughts.</label>
            <textarea
                id="comment"
                maxLength="300"
                ref={textareaRef}
                spellCheck="false"
                onFocus={() => setTextareaFocus(true)}
                onBlur={() => setTextareaFocus(false)}
                placeholder="Enter your comment here."
                onChange={e => setComment(e.target.value)}>
            </textarea>
            <input type="submit"/>
        </form>
    )
}

export default CommentForm;