function LogOutButton() {
    const logout = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/auth`, {
            method: "DELETE",
            credentials: "include"
        });
        await response.text();
        window.location.reload();
    }

    return (
        <button onClick={logout}>Log Out</button>
    )
}

export default LogOutButton;