import { useState, useEffect } from "react";
import "../App.css";

function MoodForm() {
    const [data, setData] = useState({
        text: "",
        color: ""
    });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/moods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            });
            return response.json();
        } catch(error) {
            console.error(error);
        }
    };

    const handleChange = e => {
        setData({...data, [e.target.id]: e.target.value})
    };

    return (
        <div className="flex">
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">
                    Let's talk about our feelings.
                </label>
                <textarea id="text" name="text" type="text" rows="10" cols="50" onChange={handleChange} required/>
                <label htmlFor="color">
                    What color best describes your mood today?
                </label>
                <input id="color" name="color" type="color" onChange={handleChange}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default MoodForm;