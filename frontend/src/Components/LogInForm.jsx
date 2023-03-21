import { useState, useContext, useRef } from "react";
import "../App.css";
import AuthContext from "./context/AuthContext";

function LogInForm() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const { setAuth } = useContext(AuthContext);

    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();

        if(response.status === 200) {
            setAuth(data.user);
        } else {
            setError(data.message);
        }
    }

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value});
    }

    return (
        <section className="center">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                />
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