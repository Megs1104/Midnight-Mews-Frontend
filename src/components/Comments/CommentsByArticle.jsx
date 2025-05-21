import { getCommentsByArticle } from "../../api";
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { Link } from "react-router";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { updateCommentVotesByArticle, deleteComment } from "../../api";

function CommentsByArticle({loading, setLoading, error, setError, articleId, loggedIn, setLoggedIn, comments, setComments, newComment, setNewComment}){
   const [user, setUser] = useState(null)
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser){
            setLoggedIn(true)
            setUser(loggedInUser);
        }
    }, [])

    useEffect(() => {
        getCommentsByArticle(articleId)
        .then((res) => {
            setComments(res)
        })
        .catch((err) => {
            setError(true)
        })
        .finally(() => {
            setLoading(false);
        })

    }, [articleId, setNewComment])

     if (loading){
        return <Loading />
    }

    if (error){
        return <Error />
    }

    function handleVote(commentId, voteType){
        const hasVoted = localStorage.getItem(`voted_${commentId}`) === 'true'

        if (hasVoted){
            alert("You have already voted on this comment.")
            return;
        }

        const voteIncrement = voteType === "+" ? 1 : -1;

        updateCommentVotesByArticle(commentId, voteIncrement)
        .then((updatedComment) => {
            const updatedComments = comments.map((comment) => {
                if(comment.comment_id === commentId){
                    const updatedCommentData = {...comment, votes: updatedComment.votes};

                    localStorage.setItem(`voted_${commentId}`, "true");
                    return updatedComment;
                }
                return comment;
            })
            setComments(updatedComments)
        })
        .catch((err) => {
            setError(true)
        })
    }

    function handleDelete(commentId){
        setLoading(true);
        deleteComment(commentId)
        .then(() => {
            const updatedComments = comments.filter(comment => comment.comment_id !== commentId)
            setComments(updatedComments)
        })
        .catch((err)=>{
            setError(true);
        })
        .finally(() => {
            setLoading(false)
            alert("Your comment has been deleted!")
        })
    }


    return (
        <div className="relative p-4">
            <h2 className="text-3xl text-white p-4">Comments</h2>

                <table className="bg-white rounded-lg">
                    <tbody>
                        {comments.map((comment) => {
                            const hasVoted = localStorage.getItem(`voted_${comment.comment_id}`) === 'true'
                            return(
                                <tr key={comment.comment_id} className="border-b">
                                    <td className="p-4 flex flex-col space-y-4">
                                    <p>{comment.body}</p>
                                    <p>By {comment.author}</p>
                                    <p>{comment.created_at}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <p>Votes: {comment.votes}</p>

                                     {loggedIn ? (
                                        <>
                                        <button disabled={hasVoted} onClick={() => handleVote(comment.comment_id, "+")} className="bg-[#BBA5E1] p-2 w-15 rounded-lg">+1</button>
                                        <button disabled={hasVoted} onClick={() => handleVote(comment.comment_id, "-")} className="bg-[#BBA5E1] p-2 w-15 rounded-lg">-1</button>
                                        </>
                                     ) : (
                                        <p>Login to Vote</p>
                                     )}  

                                     {user === comment.author &&(
                                        <button onClick={() => handleDelete(comment.comment_id)} className="bg-[#BBA5E1] p-2 w-20 rounded-lg">Delete</button>
                                     )} 
                                    </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )

}

export default CommentsByArticle;