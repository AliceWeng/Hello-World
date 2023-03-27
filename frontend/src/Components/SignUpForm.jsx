import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const USERNAME_REGEX = /^[a-zA-Z0-9]{4,12}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

function SignUpForm() {
    const [user, setUser] = useState({
        nickname: "",
        username: "",
        password: "",
    });

    const [nicknameError, setNicknameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [nicknameFocus, setNicknameFocus] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [nicknameInvalid, setNicknameInvalid] = useState(null);
    const [usernameInvalid, setUsernameInvalid] = useState(null);
    const [passwordInvalid, setPasswordInvalid] = useState(null);

    const [usernameTaken, setUsernameTaken] = useState(null);

    const [passwordToggle, setPasswordToggle] = useState(false);
    
    const nicknameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();
 
    useEffect(() => {
        nicknameRef.current.focus();
    }, []);

    useEffect(() => {
        if(user.nickname && !nicknameFocus) {
            if(user.nickname.length > 26) {
                setNicknameInvalid(true);
                setNicknameError("Sorry, your nickname can only be up to 26 characters long.");
            } else {
                setNicknameInvalid(false);
            }
        }
    }, [nicknameFocus]);

    useEffect(() => {
        if(USERNAME_REGEX.test(user.username)) {
            const fetchUsername = async () => {
                const response = await fetch(`http://localhost:3001/api/user/username/${user.username}`);
                const data = await response.text();
                return (data ? true : false);
            }
            const checkUsername = async () => {
                const result = await fetchUsername();
                setUsernameTaken(result);
            }
            checkUsername();
        }
    }, [user.username]);

    useEffect(() => {
        if(user.username && !usernameFocus) {
            setUsernameInvalid(!USERNAME_REGEX.test(user.username));

            if(USERNAME_REGEX.test(user.username)) {
                if(usernameTaken) {
                    setUsernameInvalid(true);
                    setUsernameError("Sorry, this username is already taken.");
                }
            }
            if(!USERNAME_REGEX.test(user.username)) {
                if(user.username.length < 4 || user.username.length > 12) {
                    setUsernameError("Sorry, your username must be between 4 and 12 characters.");
                } else {
                    setUsernameError("Sorry, your username can only contain letters and numbers.");
                }
            }
        }
    }, [usernameFocus]);

    useEffect(() => {
        if(user.password && !passwordFocus) {
            setPasswordInvalid(!PASSWORD_REGEX.test(user.password));

            if(!PASSWORD_REGEX.test(user.password)) {
                if(user.password.length < 8) {
                    setPasswordError("Sorry, your password must be 8 or more characters long.");
                } else {
                    setPasswordError("Sorry, your password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.");
                }
            }
        }
    }, [passwordFocus]);

    const handleSubmit = async e => {
        e.preventDefault();

        if(!user.password) {
            setPasswordInvalid(true);
            setPasswordError("Enter a password.");
            passwordRef.current.focus();
        }
        if(!user.username) {
            setUsernameInvalid(true);
            setUsernameError("Enter a username.");
            usernameRef.current.focus();
        }
        if(!user.nickname) {
            setNicknameInvalid(true);
            setNicknameError("Enter a nickname.");
            nicknameRef.current.focus();
        }

        if(!user.nickname || !user.username || !user.password) {
            return;
        }
        if(user.nickname.length <= 26 && USERNAME_REGEX.test(user.username) && !usernameTaken && PASSWORD_REGEX.test(user.password)) {
            try {
                const response = await fetch("http://localhost:3001/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                await response.text();
                setUser("");
                navigate("/");
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
                    className={nicknameInvalid ? "red" : null}
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="off"
                    onChange={handleChange}
                    aria-invalid={nicknameInvalid}
                    aria-describedby="nickname-req"
                    value={user.nickname}
                    ref={nicknameRef}
                    onFocus={() => setNicknameFocus(true)}
                    onBlur={() => setNicknameFocus(false)}
                    maxLength="26"
                />
                <p id="nickname-req" className={nicknameInvalid ? "error" : "hidden"}>
                    {nicknameInvalid
                        ? nicknameError
                        : "Please enter a nickname up to 26 characters long."}
                </p>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    className={usernameInvalid ? "red" : null}
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="off"
                    onChange={handleChange}
                    aria-invalid={usernameInvalid}
                    aria-describedby="username-req"
                    value={user.username}
                    ref={usernameRef}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    maxLength="12"
                />
                <p id="username-req" className={usernameInvalid ? "error" : "hidden"}>
                    {usernameInvalid
                        ? usernameError
                        : "Please enter a username 4 to 12 alphanumeric characters long."}
                </p>
                <label htmlFor="password">Password</label>
                <div className="passwordContainer">
                    <input
                        type={passwordToggle ? "text" : "password"}
                        id="password"
                        className={passwordInvalid ? "red inputPadding" : "inputPadding"}
                        spellCheck="false"
                        autoCapitalize="off"
                        autoComplete="new-password"
                        onChange={handleChange}
                        aria-invalid={passwordInvalid}
                        aria-describedby="password-req"
                        value={user.password}
                        ref={passwordRef}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
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
                <p id="password-req" className={passwordInvalid ? "error" : "hidden"}>
                    {passwordInvalid
                        ? passwordError
                        : "Please enter a password 8 or more characters long with at least 1 uppercase letter, 1 lowercase letter, and 1 number."}
                </p>
                <input type="submit" className="submit"/>
                <p>Already have an account? <Link className="link" to="/login">Log in.</Link></p>
            </form>
        </section>
    )
}

export default SignUpForm;