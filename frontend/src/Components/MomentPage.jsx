import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Moment from "./moments/Moment";
import ErrorPage from "./ErrorPage";
import Comment from "./moments/Comment";

function MomentPage() {
    const [comments, setComments] = useState();
    const [moment, setMoment] = useState();
    const [momentId, setMomentId] = useState("");

    const location = useLocation();

    useEffect(() => {
        let uri = location.pathname.replace(/\/[\w\d]+\//, "");
        setMomentId(uri.replace(/\//g, ""));
    }, [location]);

    useEffect(() => {
        if(momentId) {
            const fetchMoment = async () => {
                const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${momentId}`);
                const momentData = await response.json();
                setMoment(momentData)
            }
            fetchMoment();
            fetchComments();
        }
    }, [momentId]);

    const fetchComments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${momentId}`);
        const commentsData = await response.json();
        setComments(commentsData);
    }

    return (
        <main>
                {moment
                    ? <>    
                            <div className="flexbox">
                                <Moment moment={moment} fetchComments={fetchComments}/>
                            </div>
                            <h3>Comments</h3>
                            {comments
                                ? comments.map((comment, index) => {
                                return (
                                <div className="flexbox" key={index}>
                                    <Comment comment={comment} fetchComments={fetchComments}/>
                                </div>
                                )}) : null}
                      </>
                    : <ErrorPage/>}
        </main>
    )
}

export default MomentPage;