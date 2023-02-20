import "../App.css";

function LogInForm() {
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="center">
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" required/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="text" required/>
                <input className="submit" type="submit"/>
            </form>
        </div>
    )
}

export default LogInForm;