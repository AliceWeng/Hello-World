import { useState } from "react";

function PostForm() {
    const [post, setPost] = useState({
        post: ""
    });

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        });
        await response.text();
        window.location.reload();
    };

    return (
        <div className="post">
            <form onSubmit={handleSubmit}>
                <label htmlFor="post">
                    Let's talk about our feelings.
                </label>
                <textarea
                    id="post"
                    type="text"
                    spellCheck="false"
                    placeholder="Write your post here."
                    onChange={e => setPost({[e.target.id]: e.target.value})}
                    maxLength="300"
                    />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default PostForm;