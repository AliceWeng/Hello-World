function Moment({moment, index, auth}) {
    
    const deletePost = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "DELETE"
        })
        await response.text();
        window.location.reload();
    }

    return (
        <div className="moment" key={index}>
            <p>{moment.user.nickname}</p>
            <p>{moment.post}</p>
            {!auth ? null : auth._id === moment.user._id ? <button onClick={deletePost}>Delete</button> : null}
        </div>
    )
}

export default Moment;