import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const USERNAME_REGEX = /^[a-zA-Z0-9]{4,12}$/;
const PASSWORD_REGEX = /^[]{8,}$/;

function SignUpForm() {
    const [user, setUser] = useState({
        nickname: "",
        username: "",
        password: "",
        email: "",
        birthday: "mm/dd/yyyy"
    });
    const [error, setError] = useState({
        username: ""
    });

    const [focus, setFocus] = useState({
        username: false
    });

    const [valid, setValid] = useState({
        username: true
    });

    useEffect(() => {
        if(user.username && !focus.username) {
            const usernameTaken = async () => {
                const response = await fetch(`http://localhost:3001/api/user/username/${user.username}`);
                const data = await response.text();
                return data ? true : false;
            }
            if(usernameTaken) {
                setError({...error, username: "Sorry, this username is already taken. Please choose a different one."});
                setValid({...valid, username: false});
                return;
            }
            setValid({...valid, username: USERNAME_REGEX.test(user.username)});
            if(valid.username) {
                setError({...error, username: ""});
            }
            if(!valid.username) {
                if(user.username.length < 4 || user.username.length > 12) {
                    setError({...error, username: "Sorry, your username must be between 4 and 12 characters."})
                } else setError({...error, username: "Sorry, your username must only contain letters and numbers."})
            }
        }
    }, [user.username])

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setUser("");
        try {
            const response = await fetch("http://localhost:3001/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            return await response.json();
        } catch(error) {
            console.error("Error.");
            setError(true);
        }
        if(!error) {
            navigate("/");
        }
    }

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value});
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label htmlFor="nickname">Nickname</label>
                <input
                    type="text"
                    id="nickname"
                    spellCheck="false"
                    autoComplete="off"
                    onChange={handleChange}
                    value={user.nickname}
                    required />
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    spellCheck="false"
                    autoComplete="off"
                    onChange={handleChange}
                    aria-invalid={valid.username ? "false" : "true"}
                    aria-describedby="username-req"
                    value={user.username}
                    onFocus={() => setFocus({...focus, username: true})}
                    onBlur={() => setFocus({...focus, username: false})}
                    required />
                <p id="username-req" className={valid.username ? "hidden" : "error"}>
                    {valid.username
                        ? "Please enter 4 to 12 alphanumeric characters."
                        : error.username}
                </p>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    spellCheck="false"
                    autoComplete="new-password"
                    onChange={handleChange}
                    aria-invalid={valid.password ? "false" : "true"}
                    required />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    spellCheck="false"
                    autoComplete="off"
                    onChange={handleChange}
                    required />
                <label htmlFor="birthday">Birthday</label>
                <input id="birthday" name="birthday" type="date" onChange={handleChange} required/>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default SignUpForm;