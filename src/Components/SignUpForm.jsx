import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function SignUpForm() {
    const [user, setUser] = useState({
        nickname: "",
        username: "",
        password: "",
        email: "",
        birthday: "mm/dd/yyyy"
    });
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
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
    }
    return (
        <div className="center">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label htmlFor="nickname">Nickname</label>
                <input id="nickname" name="nickname" type="text" onChange={handleChange} required/>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" onChange={handleChange} required/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="text" onChange={handleChange} required/>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" onChange={handleChange} required/>
                <label htmlFor="birthday">Birthday</label>
                <input id="birthday" name="birthday" type="date" onChange={handleChange} required/>
                <input className="submit" type="submit"/>
            </form>
        </div>
    )
}

export default SignUpForm;