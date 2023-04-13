import { useState, useContext, useEffect } from "react";
import "../App.css";
import AuthContext from "./context/AuthContext";

function MoodForm() {
    const [data, setData] = useState({
        user: "",
        mood: ""
    });

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        setData({ user: auth._id })
    }, []);

    const handleChange = e => {
        setData({...data, [e.target.id]: e.target.value})
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moods`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            await response.json();
            window.location.reload();
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="mood">
                    Let's talk about our feelings.
                </label>
                <textarea
                    id="mood"
                    type="text"
                    onChange={handleChange}
                    />
                <input className="submit" type="submit"/>
            </form>
        </div>
    )
}

export default MoodForm;