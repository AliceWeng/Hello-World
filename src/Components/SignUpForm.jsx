import { useState } from "react";

import "../App.css";

function SignUpForm() {
    const [] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="center">
            <form onSubmit={handleSubmit}>
                <label htmlFor="nickname">What name do you go by?</label>
                <input id="nickname" name="nickname" type="text" required/>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" required/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="text" required/>
                <input className="submit" type="submit"/>
            </form>
        </div>
    )
}

export default SignUpForm;