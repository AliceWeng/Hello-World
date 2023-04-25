import { useState, useEffect, useRef } from "react";

function LogInForm({setForm, setAuth}) {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const [passwordToggle, setPasswordToggle] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if(!user.password) passwordRef.current.focus();
        if(!user.username) usernameRef.current.focus();
        if(!user.username || !user.password) {
            setError("Please fill out all required fields.");
            return;
        }
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/auth`, {
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
            setForm("");
        } else {
            setError(data.message);
        }
    }

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value});
    }

    return (
        <div className="center">    
            <form onSubmit={handleSubmit}>
                <div className="closeContainer">
                    <button
                        type="button"
                        className="close"
                        aria-label="Close form."
                        onClick={() => setForm("")}>
                    </button>
                </div>
                <h1>Log In</h1>
                {error ? <p role="alert" className="loginError">{error}</p> : null}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="username"
                    onChange={handleChange}
                    ref={usernameRef}/>
                <label htmlFor="password">Password</label>
                <div className="passwordContainer">
                    <input
                        type={passwordToggle ? "text" : "password"}
                        id="password"
                        spellCheck="false"
                        autoCapitalize="off"
                        autoComplete="current-password"
                        onChange={handleChange}
                        ref={passwordRef}/>
                    <button
                        type="button"
                        className="passwordToggle"
                        onClick={() => setPasswordToggle(!passwordToggle)}
                        aria-label={passwordToggle ? "Hide your password." : "Show your password."}>
                        {passwordToggle ? "hide" : "show"}
                    </button>
                </div>
                <input type="submit"/>
                <p>Don't have an account? <span className="link" onClick={() => setForm("signup")}>Sign up.</span></p>
            </form>
        </div>
    )
}

export default LogInForm;