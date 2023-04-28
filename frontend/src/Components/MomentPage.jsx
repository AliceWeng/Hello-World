import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Comment from "./moments/Comment";
import Moment from "./moments/Moment";

function MomentPage() {
    const [moment, setMoment] = useState();

    const [comments, setComments] = useState([]);

    const [count, setCount] = useState(0);

    const { momentId } = useParams();

    const navigate = useNavigate();

    const observer = useRef();

    const lastCommentRef = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && comments.length !== count) {
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
                if(momentData) fetchComments();
            });

        fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/count/${momentId}`)
            .then(response => response.json())
            .then(countData => setCount(countData));
    }, []);

    const fetchComments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${momentId}/?number=${comments.length}`);
        const commentsData = await response.json();
        !comments
        ? setComments(commentsData)
        : setComments([...comments, ...commentsData])
    }

    return (
        <main>
            <div className="flexbox">
                <div className="moment">
                    <IoMdArrowRoundBack className="back" onClick={() => navigate(-2)}/>
                </div>
            </div>
            { moment === null
            ? <div className="flexbox">
                <h1 className="moment">Sorry, this moment doesn't exist.</h1>
              </div>
            : !moment
            ? null
            : <>
                <Moment moment={moment} comments={comments} setComments={setComments} count={count} setCount={setCount}/>
                { comments.length
                ? <>
                    <h2 className="margin">Comments</h2>
                    <section>
                        {comments.map((comment, index) => {
                            if(comments.length === index + 1) {
                                return (
                                    <div ref={lastCommentRef} key={index}>
                                        <Comment comment={comment} comments={comments} setComments={setComments} count={count} setCount={setCount}/>
                                    </div>
                                )
                            } else {
                                return <Comment comment={comment} key={index} comments={comments} setComments={setComments} count={count} setCount={setCount}/>
                            }
                        })}
                    </section>
                  </>
                : <p className="margin">No comments yet.</p> }
              </> }
        </main>
    )
}

export default MomentPage;