function Moment({moment, auth}) {

    const deleteMoment = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "DELETE"
        })
        await response.text();
        window.location.reload();
    }

    return (
        <div className="moment">
            <p>{moment.user.nickname}</p>
            <p>{moment.post}</p>
            {!auth ? null : moment.user._id === auth._id ? <button onClick={deleteMoment}>Delete</button> : null}
        </div>
    )
}

export default Moment;