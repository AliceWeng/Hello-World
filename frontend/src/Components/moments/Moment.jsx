function Moment({moment, auth, fetchMoments}) {
    const deleteMoment = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "DELETE"
        })
        fetchMoments();
    }

    return (
        <div className="moment">
            <p>{moment.user.nickname}</p>
            <p>{moment.post}</p>
            {!auth ? null : auth._id !== moment.user._id ? null : <button onClick={deleteMoment}>Delete</button>}
        </div>
    )
}

export default Moment;