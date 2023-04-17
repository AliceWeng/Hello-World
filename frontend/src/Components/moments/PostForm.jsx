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
        <div className="flex">
            <form onSubmit={handleSubmit}>
                <label htmlFor="post">
                    Let's talk about our feelings.
                </label>
                <textarea
                    id="post"
                    type="text"
                    onChange={e => setPost({[e.target.id]: e.target.value})}
                    />
                <input className="submit" type="submit"/>
            </form>
        </div>
    )
}

export default PostForm;