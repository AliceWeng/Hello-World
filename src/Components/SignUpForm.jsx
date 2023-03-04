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
        birthday: ""
    });

    const [nicknameError, setNicknameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");

    const [toggle, setToggle] = useState(false);

    const [nicknameFocus, setNicknameFocus] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [birthdayFocus, setBirthdayFocus] = useState(false);
    const [submitFocus, setSubmitFocus] = useState(false);

    const [nicknameInvalid, setNicknameInvalid] = useState(null);
    const [usernameInvalid, setUsernameInvalid] = useState(null);
    const [passwordInvalid, setPasswordInvalid] = useState(null);
    const [emailInvalid, setEmailInvalid] = useState(null);
    const [birthdayInvalid, setBirthdayInvalid] = useState(null);

    useEffect(() => {
        if(user.username && !usernameFocus) {
            const validation = USERNAME_REGEX.test(user.username);
            setUsernameInvalid(!validation);

            if(validation === false) {
                if(user.username.length < 4 || user.username.length > 12) {
                    setUsernameError("Sorry, your username must be between 4 and 12 characters.");
                } else {
                    setUsernameError("Sorry, your username can only contain letters and numbers.");
                }
            }
            if(validation === true) {
                const fetchUsername = async () => {
                    const response = await fetch(`http://localhost:3001/api/user/username/${user.username}`);
                    const data = await response.text();
                    return (data ? true : false);
                }
                const checkUsername = async () => {
                    const usernameTaken = await fetchUsername();
                    if(usernameTaken) {
                        setUsernameInvalid(true);
                        setUsernameError("Sorry, this username is already taken. Please choose a different one.");
                    }
                }
                checkUsername();
            }
        }
    }, [usernameFocus]);

    useEffect(() => {
        if(user.nickname && !nicknameFocus) {
            if(user.nickname.length > 26) {
                setNicknameInvalid(true);
                setNicknameError("Sorry, your nickname must be between 1 and 26 characters.");
            } else setNicknameInvalid(false);
        }
    }, [nicknameFocus]);

    useEffect(() => {
        if(submitFocus) {
            if(!user.nickname) {
                setNicknameInvalid(true);
                setNicknameError("Enter a nickname.");
            }
            if(!user.username) {
                setUsernameInvalid(true);
                setUsernameError("Enter a username.");
            }
            if(!user.password) {
                setPasswordInvalid(true);
                setPasswordError("Enter a password.");
            }
            if(!user.email) {
                setEmailInvalid(true);
                setEmailError("Enter an email.");
            }
            if(!user.birthday) {
               setBirthdayInvalid(true);
               setBirthdayError("Enter your date of birth.");
            }
            if(!user.nickname || !user.username || !user.password || !user.email || !user.birthday) {
                return;
            }
        }
    }, [submitFocus]);

    const handleSubmit = async e => {
        e.preventDefault();

            /* try {
                const response = await fetch("http://localhost:3001/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                
                return;
            } catch(error) {
                console.error("Error.");
            }*/
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
                    autoComplete="off"
                    onChange={handleChange}
                    aria-invalid={nicknameInvalid}
                    aria-describedby="nickname-req"
                    value={user.nickname}
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
                    autoComplete="off"
                    onChange={handleChange}
                    aria-invalid={usernameInvalid}
                    aria-describedby="username-req"
                    value={user.username}
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
                <input
                    type={toggle ? "text" : "password"}
                    id="password"
                    className={passwordInvalid ? "red" : null}
                    spellCheck="false"
                    autoComplete="new-password"
                    onChange={handleChange}
                    aria-invalid={passwordInvalid}
                    aria-describedby="password-req"
                    value={user.password}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    />
                <p id="password-req" className={passwordInvalid ? "error" : "hidden"}>
                        {passwordInvalid 
                            ? passwordError
                            : "Please enter a password 8 or more characters long. You're required to have at least one uppercase letter, one lowercase letter, and one number."}
                </p>
                <button onClick={() => setToggle(!toggle)}></button>
                <label htmlFor="birthday">Birthday</label>
                <input id="birthday" name="birthday" type="date" onChange={handleChange} />
                <button
                    onFocus={() => setSubmitFocus(true)}
                    onBlur={() => setSubmitFocus(false)}
                >Submit</button>
            </form>
        </section>
    )
}

export default SignUpForm;