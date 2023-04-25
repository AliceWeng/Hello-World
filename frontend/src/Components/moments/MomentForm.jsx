import { useState, useEffect, useRef } from "react";

function MomentForm({fetchMoments, userId, setCreate}) {
    const [post, setPost] = useState("");

    const textareaRef = useRef();

    useEffect(() => {
        textareaRef.current.focus();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(!post || post.length > 300) {
            textareaRef.current.focus();
            return;
        }
        setCreate(false);
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({post: post})
        });
        fetchMoments(userId);
    };

    return (
        <div className="flexbox">
            <form className="moment" onSubmit={handleSubmit}>
                <label htmlFor="post">Let's talk about our feelings.</label>
                <textarea
                    id="post"
                    maxLength="300"
                    ref={textareaRef}
                    spellCheck="false"
                    placeholder="Write your post here."
                    onChange={e => setPost(e.target.value)}>
                </textarea>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default MomentForm;