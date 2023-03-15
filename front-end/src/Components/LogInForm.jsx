import { useState, useContext } from "react";
import "../App.css";
import AuthContext from "./context/AuthContext";

function LogInForm() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });

    const { auth, setAuth } = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChange = e => {
        setUserData({...userData, [e.target.id]: e.target.value});
    }

    return (
        <section className="center">
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" autoComplete="off" onChange={handleChange} required/>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    autoComplete="off"
                    onChange={handleChange}
                    required />
                <input className="submit" type="submit"/>
            </form>
        </section>
    )
}

export default LogInForm;