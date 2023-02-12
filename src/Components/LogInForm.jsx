import "../App.css";

function LogInForm() {
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="flex">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" required/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="text" required/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LogInForm;