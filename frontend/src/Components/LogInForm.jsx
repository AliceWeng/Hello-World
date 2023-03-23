import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
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
    const errorRef = useRef();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/api/user/login", {
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
            errorRef.current.focus();
        }
    }

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value});
    }

    return (
        <section className="center">    
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                {error ? <p ref={errorRef} role="alert">{error}</p> : null}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="username"
                    onChange={handleChange}
                    value={user.username}
                    ref={usernameRef}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={user.password}
                />
                <input className="submit" type="submit"/>
                <p>Don't have an account? <Link to="/signup">Sign up.</Link></p>
            </form>
        </section>
    )
}

export default LogInForm;