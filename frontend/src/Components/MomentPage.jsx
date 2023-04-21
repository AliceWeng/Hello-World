import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Moment from "./moments/Moment";
import Comment from "./moments/Comment";
import ErrorPage from "./ErrorPage";

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
                    ? <>    <div className="flexbox">
                                <Moment moment={moment} fetchComments={fetchComments}/>
                            </div>
                            {comments
                                ? comments.map((comment, index) => {
                                return (
                                <div className="flexbox">
                                    <Comment comment={comment} key={index}/>
                                </div>
                                )}) : null}
                      </>
                    : <ErrorPage/>}
        </main>
    )
}

export default MomentPage;