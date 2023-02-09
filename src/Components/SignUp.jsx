import { useState } from "react";
import "../App.css";

function SignUp() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <> {
            submitted
            ? null
            : <div>
                <form onSubmit={handleSubmit} action="/" method="POST">
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" required/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="text" required/>
                    <input type="submit"/>
                </form>
              </div>
        }
        </>
    )
}

export default SignUp;