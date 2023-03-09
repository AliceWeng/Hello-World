import { useState, useEffect, useRef } from "react";
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

    const [usernameTaken, setUsernameTaken] = useState(null);

    
    const nicknameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const birthdayRef = useRef();
 
    useEffect(() => {
        nicknameRef.current.focus();
    }, [])

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
                    setUsernameError("Sorry, this username is already taken. Please choose a different one.");
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
        if(user.nickname && !nicknameFocus) {
            if(user.nickname.length > 26) {
                setNicknameInvalid(true);
                setNicknameError("Sorry, your nickname can only be up to 26 characters long.");
            } else setNicknameInvalid(false);
        }
    }, [nicknameFocus]);

    const handleSubmit = async e => {
        e.preventDefault();

        if(!user.birthday) {
           setBirthdayInvalid(true);
           setBirthdayError("Enter your date of birth.");
           birthdayRef.current.focus();
        }
        if(!user.email) {
            setEmailInvalid(true);
            setEmailError("Enter an email.");
            emailRef.current.focus();
        }
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

        if(!user.nickname || !user.username || !user.password || !user.email || !user.birthday) {
            return;
        }
        if(USERNAME_REGEX.test(user.username) && !usernameTaken) {
            try {
                const response = await fetch("http://localhost:3001/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                return await response.text();
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
                    ref={passwordRef}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <p id="password-req" className={passwordInvalid ? "error" : "hidden"}>
                    {passwordInvalid
                        ? passwordError
                        : "Please enter a password 8 or more characters long. You're required to have at least one uppercase letter, one lowercase letter, and one number."}
                </p>
                <div onClick={() => setToggle(!toggle)}></div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className={emailInvalid ? "red" : null}
                    spellCheck="false"
                    autoComplete="off"
                    onChange={handleChange}
                    aria-invalid={emailInvalid}
                    aria-describedby="email-req"
                    value={user.email}
                    ref={emailRef}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="email-req" className={emailInvalid ? "error" : "hidden"}>
                    {emailInvalid
                        ? emailError
                        : "Please enter an email address."}
                </p>
                <label htmlFor="birthday">Birthday</label>
                <input
                    type="date"
                    id="birthday"
                    onChange={handleChange}
                    ref={birthdayRef}
                />
                <input type="submit" className="submit"/>
            </form>
        </section>
    )
}

export default SignUpForm;