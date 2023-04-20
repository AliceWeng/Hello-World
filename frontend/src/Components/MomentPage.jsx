import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Moment from "./moments/Moment";
import Comment from "./moments/Comment";

function MomentPage() {
    const [comments, setComments] = useState();
    const [moment, setMoment] = useState();
    const [id, setId] = useState("");
    const location = useLocation();

    useEffect(() => {
        let string = location.pathname.replace(/^\/[\w\d]+\//g, "")
        setId(string.replace(/\//g, ""));
    }, [location]);

    useEffect(() => {
        if(id) {
            const fetchMoment = async () => {
                const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/moments/${id}`);
                const momentData = await response.json();
                setMoment(momentData)
            }
            fetchMoment();
            fetchComments();
        }
    }, [id]);

    const fetchComments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${id}`);
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
                    : null}
        </main>
    )
}

export default MomentPage;