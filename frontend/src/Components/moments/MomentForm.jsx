import { useState } from "react";
import { useParams } from "react-router-dom";

function MomentForm({fetchMoments, userId, setCreate}) {
    const [post, setPost] = useState("");

    const { username } = useParams();

    document.addEventListener("click", e => {
        if(!e.target.closest("form") && !e.target.matches(".create")) setCreate(false);
    });

    document.addEventListener("keydown", e => {
        if(e.key === "Escape") setCreate(false);
    });

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
        if(username) fetchMoments(userId);
    };

    return (
        <div className="center">
            <form onSubmit={handleSubmit}>
                <div className="closeContainer">
                    <button
                        type="button"
                        className="close"
                        aria-label="Close form."
                        onClick={() => setCreate("")}>
                    </button>
                </div>
                <label htmlFor="post">Let's talk about our feelings.</label>
                <textarea
                    id="post"
                    maxLength="300"
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