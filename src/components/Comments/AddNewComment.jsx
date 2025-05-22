import { useState, useEffect } from "react";
import { postNewComment } from "../../api";

function AddNewComment({articleId, loggedIn, setLoggedIn, comments, setComments, newComment, setNewComment}){
const [postingLoading, setPostingLoading] = useState(false);
const [postingError, setPostingError] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser){
            setLoggedIn(true);
        }
    }, [setLoggedIn]);

    function handleChange(e){
        setNewComment(e.target.value);
    };

    function handleSubmit(e){
        const loggedInUser = localStorage.getItem('loggedInUser');
        e.preventDefault();
        if(newComment.trim()){
            setPostingLoading(true);
            setPostingError(false);

            if(!navigator.online){
                setPostingLoading(false);
                setPostingError(true);
                return;
            }

            const errorTimer = setTimeout(() => {
                setPostingLoading(false);
                setPostingError(true);
            }, 300000); 

            postNewComment(articleId, loggedInUser, newComment)
            .then((newCommentData) => {
                clearTimeout(errorTimer);
                setNewComment("");
                setComments((prevComments) => [ newCommentData, ...prevComments]);
            })
            .catch((err) => {
                clearTimeout(errorTimer);
                setPostingError(true);
            })
            .finally(() => {
                setPostingLoading(false);
            });
        };
    };

    return(
        <div className="max-w-md mx-auto mt-8 p-6">
        {postingError && (
            <div>
                <p className="bg-white text-red-600 rounded-lg">Error posting comment, please try again later.</p>
            </div>
        )}

        {loggedIn ? (
            <>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-lg font-medium mb-2 text-white">
                        Add Comment:
                    </label>
                    <input type="text" id="comment" value={newComment} onChange={handleChange} className="bg-white rounded-lg w-full h-24" required/>
                </div>
                <button type="submit" disabled={postingLoading} className="bg-[#BBA5E1] p-2 rounded-lg text-white">{postingLoading ? "Posting..." : "Post Comment"}</button>
            </form>
            </>
        ) : (
            <h2 className="text-xl p-4 bg-white rounded-lg">Plesse login to add a comment.</h2>
        )}
        </div>
    )
}

export default AddNewComment;