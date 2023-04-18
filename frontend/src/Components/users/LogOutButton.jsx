function LogOutButton({setActive, setAuth}) {
    const logout = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/auth`, {
            method: "DELETE",
            credentials: "include"
        });
        setActive("");
        setAuth("");
    }
    
    return (
        <button onClick={logout}>Log Out</button>
    )
}

export default LogOutButton;