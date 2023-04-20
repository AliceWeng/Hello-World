function Comment({comment}) {

    return (
        <div className="comment">
            <p>{comment.user.nickname}</p>
            <p>{comment.comment}</p>
        </div>
    )
}

export default Comment;