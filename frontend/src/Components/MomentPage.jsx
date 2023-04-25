import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io"
import Comment from "./moments/Comment";
import Moment from "./moments/Moment";

function MomentPage() {
    const [comments, setComments] = useState();

    const [moment, setMoment] = useState();

    const { momentId } = useParams();

    const navigate = useNavigate();
 
    useEffect(() => {
        fetchMoment();
    }, []);

    const fetchMoment = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${momentId}`);
        const momentData = await response.json();
        if(momentData) fetchComments();
        setMoment(momentData);
    }

    const fetchComments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${momentId}`);
        const commentsData = await response.json();
        setComments(commentsData);
    }

    return (
        <main>
            <div className="flexbox">
                <div className="backContainer moment">
                    <IoMdArrowRoundBack className="back" onClick={() => navigate(-1)}/>
                </div>
            </div>
            { moment === null
            ? <div className="flexbox">
                <h1 className="moment">Sorry, this moment doesn't exist.</h1>
              </div>
            : !moment
            ? null
            : <>
                <Moment moment={moment} fetchComments={fetchComments}/>
                { !comments
                ? null
                : comments.length
                ? <>
                    <h2 className="margin">Comments</h2>
                    <section>
                        {comments.map((comment, index) => {
                            return (
                                <Comment comment={comment} key={index} fetchComments={fetchComments}/>
                            )
                        })}
                    </section>
                  </>
                : <p className="margin">No comments yet.</p> }
              </> }
        </main>
    )
}

export default MomentPage;