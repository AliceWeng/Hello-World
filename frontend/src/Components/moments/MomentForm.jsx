import { useState } from "react";

function MomentForm({fetchMoments, userId, setCreate}) {
    const [post, setPost] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        if(!post) return;
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({post: post})
        });
        setCreate(false);
        fetchMoments(userId);
    };

    return (
        <div className="flexbox m">
            <form onSubmit={handleSubmit}>
                <label htmlFor="post">Let's talk about our feelings.</label>
                <textarea
                    id="post"
                    spellCheck="false"
                    placeholder="Write your post here."
                    onChange={e => setPost(e.target.value)}
                    maxLength="300"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default MomentForm;