import { useState, useEffect, useRef } from "react";

function EditMomentForm({moment, setMoment, setEdit}) {
    const [updatedPost, setUpdatedPost] = useState(moment.post);

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
        let end = moment.post.length;
        textareaRef.current.setSelectionRange(end, end);
        textareaRef.current.focus();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(!updatedPost|| updatedPost.length > 300) {
            textareaRef.current.focus();
            return;
        }
        if(updatedPost === moment.post) {
            setEdit(false);
            return;
        }
        setEdit(false);
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({post: updatedPost})
        });
        const updatedMomentData = await response.json();
        setMoment(updatedMomentData);
    }

    return (
        <form ref={formRef} className="box" onSubmit={handleSubmit}>
            <label htmlFor="post">Edit your moment.</label>
            <textarea
                id="post"
                maxLength="300"
                ref={textareaRef}
                spellCheck="false"
                value={updatedPost}
                onFocus={() => setTextareaFocus(true)}
                onBlur={() => setTextareaFocus(false)}
                onChange={e => setUpdatedPost(e.target.value)}
                placeholder="Hey! You can't leave this empty.">
            </textarea>
            <input type="submit" value="Save Changes"/>
        </form>
    )
}

export default EditMomentForm;