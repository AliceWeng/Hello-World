import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import AuthContext from "../context/AuthContext";

function Moment({moment, fetchMoments, fetchComments}) {
    const [reply, setReply] = useState(false);

    const { auth } = useContext(AuthContext);

    const deleteMoment = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${moment._id}`, {
            method: "DELETE"
        })
        fetchMoments();
    }

    return (
            <div className="moment">
                <Link to={`/${moment.user.username}`}>
                    <p>{moment.user.nickname}</p>
                </Link>
                <Link to={`/${moment.user.username}/${moment._id}`} >
                    <p>{moment.post}</p>
                </Link>
                <button onClick={() => setReply(!reply)}>Reply</button>
                <button>Like</button>
                {!auth ? null : auth._id !== moment.user._id ? null : <button onClick={deleteMoment}>Delete</button>}
                {reply ? <CommentForm momentId={moment._id} setReply={setReply} fetchComments={fetchComments}/> : null}
            </div>
    )
}

export default Moment;