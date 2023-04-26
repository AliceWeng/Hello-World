import { useState, useEffect, useRef } from "react";

const NICKNAME_REGEX = /^.{1,26}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9]{4,12}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

function SignUpForm({setForm}) {
    const [user, setUser] = useState({
        nickname: "",
        username: "",
        password: "",
    });

    const [usernameTaken, setUsernameTaken] = useState(false);
    
    const [passwordToggle, setPasswordToggle] = useState(false);

    const [nicknameError, setNicknameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [nicknameFocus, setNicknameFocus] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [nicknameInvalid, setNicknameInvalid] = useState(null);
    const [usernameInvalid, setUsernameInvalid] = useState(null);
    const [passwordInvalid, setPasswordInvalid] = useState(null);
    
    const nicknameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
 
    useEffect(() => {
        nicknameRef.current.focus();
    }, []);

    useEffect(() => {
        if(user.nickname && !nicknameFocus) {
            setNicknameInvalid(!NICKNAME_REGEX.test(user.nickname));
            
            if(!NICKNAME_REGEX.test(user.nickname)) {
                setNicknameError("Sorry, your nickname can only be up to 26 characters long.");
            }
        }
    }, [nicknameFocus]);

    useEffect(() => {
        if(USERNAME_REGEX.test(user.username)) {
            const fetchUsername = async () => {
                const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/${user.username}`);
                const usernameData = await response.json();
                return (usernameData ? true : false);
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
        if(NICKNAME_REGEX.test(user.nickname) && USERNAME_REGEX.test(user.username) && !usernameTaken && PASSWORD_REGEX.test(user.password)) {
            setForm("");
            await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
        }
    }

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value});
    };

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
                    ref={nicknameRef}
                    onFocus={() => setNicknameFocus(true)}
                    onBlur={() => setNicknameFocus(false)}
                    maxLength="26"/>
                <p id="nickname-req" className={nicknameInvalid ? "signupError" : "hidden"}>
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
                    ref={usernameRef}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    maxLength="12"/>
                <p id="username-req" className={usernameInvalid ? "signupError" : "hidden"}>
                    {usernameInvalid
                        ? usernameError
                        : "Please enter a username 4 to 12 alphanumeric characters long."}
                </p>
                <label htmlFor="password">Password</label>
                <div className="passwordContainer">
                    <input
                        type={passwordToggle ? "text" : "password"}
                        id="password"
                        className={passwordInvalid ? "red " : null}
                        spellCheck="false"
                        autoCapitalize="off"
                        autoComplete="new-password"
                        onChange={handleChange}
                        aria-invalid={passwordInvalid}
                        aria-describedby="password-req"
                        ref={passwordRef}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}/>
                    <button
                        type="button"
                        className="passwordToggle"
                        onClick={() => setPasswordToggle(!passwordToggle)}
                        aria-label={passwordToggle ? "Hide your password." : "Show your password."}>
                        {passwordToggle ? "hide" : "show"}
                    </button>
                </div>
                <p id="password-req" className={passwordInvalid ? "signupError" : "hidden"}>
                    {passwordInvalid
                        ? passwordError
                        : "Please enter a password 8 or more characters long with at least 1 uppercase letter, 1 lowercase letter, and 1 number."}
                </p>
                <input type="submit"/>
                <p>Already have an account? <span className="link" onClick={() => setForm("login")}>Log in.</span></p>
            </form>
        </div>
    )
}

export default SignUpForm;