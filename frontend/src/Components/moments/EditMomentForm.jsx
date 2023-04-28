import { useState, useEffect, useRef } from "react";

function EditMomentForm({moment, setMoment, setEdit}) {
    const [updatedPost, setUpdatedPost] = useState(moment.post);

    const textareaRef = useRef();

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
        <form className="box" onSubmit={handleSubmit}>
            <label htmlFor="post">Edit your moment.</label>
            <textarea
                id="post"
                maxLength="300"
                ref={textareaRef}
                spellCheck="false"
                value={updatedPost}
                onChange={e => setUpdatedPost(e.target.value)}
                placeholder="Hey! You can't leave this empty.">
            </textarea>
            <input type="submit" value="Save Changes"/>
        </form>
    )
}

export default EditMomentForm;