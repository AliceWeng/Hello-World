import { useState } from "react";
import "../App.css";

function LogInForm() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChange = e => {
        setUserData({...userData, [e.target.id]: e.target.value});
    }

    return (
        <div className="center">
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" autoComplete="off" onChange={handleChange} required/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={handleChange} required/>
                <input className="submit" type="submit"/>
            </form>
        </div>
    )
}

export default LogInForm;