import { useState } from "react";

function MomentForm({fetchMoments}) {
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
        setPost("");
        fetchMoments();
    };

    return (
        <div className="post">
            <form onSubmit={handleSubmit}>
                <label htmlFor="post">Let's talk about our feelings.</label>
                <textarea
                    id="post"
                    type="text"
                    spellCheck="false"
                    placeholder="Write your post here."
                    onChange={e => setPost(e.target.value)}
                    maxLength="300"
                    value={post}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default MomentForm;