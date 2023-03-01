import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const USERNAME_REGEX = /^[a-zA-Z0-9]{4,12}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

function SignUpForm() {
    const [user, setUser] = useState({
        nickname: "",
        username: "",
        password: "",
        email: "",
        birthday: "mm/dd/yyyy"
    });
    const [error, setError] = useState({
        nickname: "",
        username: "",
        password: ""
    });

    const [toggle, setToggle] = useState(false);

    const [focus, setFocus] = useState({
        username: false
    });

    const [taken, setTaken] = useState({
        username: false
    });

    const [invalid, setInvalid] = useState({
        nickname: null,
        username: null,
        password: null
    });

    useEffect(() => {
        if(user.username && !focus.username) {
            const validation = USERNAME_REGEX.test(user.username);
            setInvalid({...invalid, username: !validation});

            if(validation === false) {
                if(user.username.length < 4 || user.username.length > 12) {
                    setError({...error, username: "Sorry, your username must be between 4 and 12 characters."});
                } else {
                    setError({...error, username: "Sorry, your username must only contain letters and numbers."});
                }
            }
            if(validation === true) {
                setError({...error, username: ""});
                const fetchUsername = async () => {
                    const response = await fetch(`http://localhost:3001/api/user/username/${user.username}`);
                    const data = await response.text();
                    return (data ? true : false);
                }
                const checkUsername = async () => {
                    const usernameTaken = await fetchUsername();
                    if(usernameTaken) {
                        setTaken({...taken, username: true});
                        setInvalid({...invalid, username: true});
                        setError({...error, username: "Sorry, this username is already taken. Please choose a different one."});
                    } else setTaken({...taken, username: false});
                }
                checkUsername();
            }
        }
    }, [focus.username]);

    const handleSubmit = async e => {
        e.preventDefault();

        if(!user.nickname) {
            setInvalid({...invalid, nickname: true});
            setError({...error, nickname: "Please enter the name you would like to go by. You can't leave this field empty."});
        }
        if(!user.username) {
            setInvalid({...invalid, username: true});
            setError({...error, username: "Please enter a username. You can't leave this field empty."});
        }
        if(!user.password) {
            setInvalid({...invalid, password: true});
            setError({...error, password: "Please enter a password. You can't leave this field empty."});
        }
        if(!user.email) {
            setInvalid({...invalid, email: true});
            setError({...error, email: "Please enter an email. You can't leave this field empty."});
        }
        if(!user.birthday) {
            setInvalid({...invalid, birthday: true});
            setError({...error, birthday: "Please enter your date of birth. You can't leave this field empty."});
        }

        if(!invalid.nickname && !invalid.username && !invalid.password && !invalid.email && !invalid.birthday) {
            setUser("");
            try {
                const response = await fetch("http://localhost:3001/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                setSuccess(true);
                return;
            } catch(error) {
                console.error("Error.");
            }
        }
    }

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value});
    };

    return (
        <section className="center">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label htmlFor="nickname">Nickname</label>
                <input
                    type="text"
                    id="nickname"
                    className={invalid.nickname ? "red" : null}
                    spellCheck="false"
                    autoComplete="off"
                    onChange={handleChange}
                    aria-invalid={invalid.nickname}
                    aria-describedby="nickname-req"
                    value={user.nickname}
                    />
                <p id="username-req" className={invalid.nickname ? "error" : "hidden"}>
                    {invalid.nickname
                        ? error.nickname
                        : "Please enter a nickname up to 26 characters."}
                </p>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    className={invalid.username ? "red" : null}
                    spellCheck="false"
                    autoComplete="off"
                    onChange={handleChange}
                    aria-invalid={invalid.username}
                    aria-describedby="username-req"
                    value={user.username}
                    onFocus={() => setFocus({...focus, username: true})}
                    onBlur={() => setFocus({...focus, username: false})}
                    />
                <p id="username-req" className={invalid.username ? "error" : "hidden"}>
                    {invalid.username
                        ? error.username
                        : "Please enter 4 to 12 alphanumeric characters."}
                </p>
                <label htmlFor="password">Password</label>
                <input
                    type={toggle ? "text" : "password"}
                    id="password"
                    className={invalid.password ? "red" : null}
                    spellCheck="false"
                    autoComplete="new-password"
                    onChange={handleChange}
                    aria-invalid={invalid.password}
                    aria-describedby="password-req"
                    value={user.password}
                    onFocus={() => setFocus({...focus, password: true})}
                    onBlur={() => setFocus({...focus, password: false})}
                    />
                <p id="password-req" className={invalid.password ? "error" : "hidden"}>
                        {invalid.password 
                            ? error.password
                            : "Please enter 8 or more characters. At least one uppercase letter, one lowercase letter, and one number."}
                </p>
                <button onClick={() => setToggle(!toggle)}></button>
                <label htmlFor="birthday">Birthday</label>
                <input id="birthday" name="birthday" type="date" onChange={handleChange} required/>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default SignUpForm;