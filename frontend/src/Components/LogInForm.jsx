import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import AuthContext from "./context/AuthContext";

function LogInForm() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    
    const [passwordToggle, setPasswordToggle] = useState(false);

    const { setAuth } = useContext(AuthContext);

    const usernameRef = useRef();
    const errorRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();

        if(response.status === 200) {
            setAuth(data.user);
            navigate("/");
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
                <div className="passwordContainer">
                    <input
                        type={passwordToggle ? "text" : "password"}
                        id="password"
                        className="inputPadding"
                        spellCheck="false"
                        autoCapitalize="off"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={user.password}
                    />
                    <button
                        type="button"
                        className="passwordToggle"
                        onClick={() => setPasswordToggle(!passwordToggle)}
                        aria-label={passwordToggle ? "Hide your password." : "Show your password."}
                    >
                        {passwordToggle ? "hide" : "show"}
                    </button>
                </div>
                <input className="submit" type="submit"/>
                <p>Don't have an account? <Link className="link" to="/signup">Sign up.</Link></p>
            </form>
        </section>
    )
}

export default LogInForm;