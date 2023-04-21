import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./moments/Comment";
import Moment from "./moments/Moment";
import ErrorPage from "./ErrorPage";

function MomentPage() {
    const [comments, setComments] = useState();

    const [moment, setMoment] = useState();

    const { momentId } = useParams();
 
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
            { moment === null
            ? <ErrorPage/>
            : !moment
            ? null
            : <>
                <div className="flexbox">
                    <Moment moment={moment} fetchComments={fetchComments}/>
                </div>
                { !comments
                ? null
                : comments.length
                ? comments.map((comment, index) => {
                    return (
                        <div className="flexbox" key={index}>
                            <Comment comment={comment} fetchComments={fetchComments}/>
                        </div>
                    )
                })
                : <div className="flexbox">
                    <p>No comment yet.</p>
                  </div> }
              </> }
        </main>
    )
}

export default MomentPage;