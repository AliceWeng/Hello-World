import { useState, useEffect, useRef } from "react";

function EditMomentForm({moment, setEdit, fetchMoment}) {
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
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({post: updatedPost})
        });
        fetchMoment();

    }
    return (
        <div className="flexbox">
            <form className="moment" onSubmit={handleSubmit}>
                <label htmlFor="post">Edit your moment.</label>
                <textarea
                    id="post"
                    maxLength="300"
                    ref={textareaRef}
                    spellCheck="false"
                    defaultValue={moment.post}
                    onChange={e => setUpdatedPost(e.target.value)}
                    placeholder="Hey! You can't leave this empty.">
                </textarea>
                <input type="submit" value="Save Changes"/>
            </form>
            <div className="blackout"></div>
        </div>
    )
}

export default EditMomentForm;