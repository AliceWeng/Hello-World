import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Comment from "./moments/Comment";
import Moment from "./moments/Moment";

function MomentPage() {
    const [moment, setMoment] = useState();

    const [comments, setComments] = useState([]);

    const [commentsCount, setCommentsCount] = useState(0);

    const { momentId } = useParams();

    const navigate = useNavigate();

    const observer = useRef();

    const lastCommentRef = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && comments.length !== commentsCount) {
                fetchComments();
            }
        });
        if(node) observer.current.observe(node);
    }, [comments]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${momentId}`)
            .then(response => response.json())
            .then(momentData => {
                setMoment(momentData);
                if(momentData) {
                    fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/moment/${momentId}/count`)
                        .then(response => response.json())
                        .then(countData => setCommentsCount(countData));
                    fetchComments();
                }
            });
    }, []);

    const fetchComments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/moment/${momentId}/?number=${comments.length}`);
        const commentsData = await response.json();
        setComments([...comments, ...commentsData]);
    }

    return (
        <main>
            <div className="width">
                <div className="box">
                    <IoMdArrowRoundBack className="back" onClick={() => navigate(-2)}/>
                </div>
                { moment === null
                ? <h1 className="box">Sorry, this moment doesn't exist.</h1>
                : !moment
                ? null
                : <>
                    <Moment moment={moment} setMoment={setMoment} comments={comments} setComments={setComments} commentsCount={commentsCount} setCommentsCount={setCommentsCount}/>
                    { comments.length
                    ? <>
                        <h2 className="margin">Comments</h2>
                        {comments.map((comment, index) => {
                            if(comments.length === index + 1) {
                                return (
                                    <div ref={lastCommentRef} key={index}>
                                        <Comment comment={comment} comments={comments} setComments={setComments} commentsCount={commentsCount} setCommentsCount={setCommentsCount}/>
                                    </div>
                                )
                            } else return <Comment comment={comment} key={index} comments={comments} setComments={setComments} commentsCount={commentsCount} setCommentsCount={setCommentsCount}/>
                        })}
                    </>
                    : <p className="margin">No comments yet.</p> }
                </> }
            </div>
        </main>
    )
}

export default MomentPage;