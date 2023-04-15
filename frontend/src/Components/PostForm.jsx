import { useState, useContext, useEffect } from "react";

function MoodForm() {
    const [post, setPost] = useState({
        post: ""
    });

    const handleSubmit = async e => {
        e.preventDefault();

        try {
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
        } catch(error) {
            console.error("Error.");
        }
    };

    return (
        <div>
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

export default MoodForm;