import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function MoodForm() {
    const [data, setData] = useState({
        mood: "",
        color: ""
    });

    const navigate = useNavigate();

    const handleChange = e => {
        setData({...data, [e.target.id]: e.target.value})
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/moods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            await response.json();
        } catch(error) {
            console.error(error);
        }
        navigate("/moods");
    };

    return (
        <div className="center">
            <form onSubmit={handleSubmit}>
                <label htmlFor="mood">
                    Let's talk about our feelings.
                </label>
                <textarea id="mood" name="mood" type="text" onChange={handleChange} required/>
                <label htmlFor="color">
                    What color best describes your mood today?
                </label>
                <input className="colorInput" id="color" name="color" type="color" onChange={handleChange}/>
                <input className="submit" type="submit"/>
            </form>
        </div>
    )
}

export default MoodForm;