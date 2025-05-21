import { useState, useEffect } from "react";
import { postNewComment } from "../../api";

function AddNewComment({loading, setLoading, error, setError, articleId, loggedIn, setLoggedIn, comments, setComments, newComment, setNewComment}){

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser')
        if (loggedInUser){
            setLoggedIn(true);
        }
    }, [setLoggedIn])

    function handleChange(e){
        setNewComment(e.target.value);
    }

    function handleSubmit(e){
        const loggedInUser = localStorage.getItem('loggedInUser')
        e.preventDefault();
        if(newComment.trim()){
            setLoading(true);
            postNewComment(articleId, loggedInUser, newComment)
            .then((newCommentData) => {
                setNewComment("");

                setComments((prevComments) => [newCommentData, ...prevComments])
            })
            .catch((err) => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
                alert("Your comment has been posted!");
            })
        }
    }

    if (loading){
        return <Loading />
    }

    if (error){
        return <Error />
    }

    return(
        <div className="max-w-md mx-auto mt-8 p-6">
        {loggedIn ? (
            <>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-lg font-medium mb-2 text-white">
                        Add Comment:
                    </label>
                    <input type="text" id="comment" value={newComment} onChange={handleChange} className="bg-white rounded-lg w-full h-24"/>
                </div>
                <button type="submit" className="bg-[#BBA5E1] p-2 rounded-lg text-white">Post Comment</button>
            </form>
            </>
        ) : (
            <h2 className="text-xl p-4 bg-white rounded-lg">Plesse login to add a comment.</h2>
        )}
        </div>
    )
}

export default AddNewComment;