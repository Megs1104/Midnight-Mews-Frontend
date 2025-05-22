import { getCommentsByArticle } from "../../api";
import { useState, useEffect } from "react";
import { updateCommentVotesByArticle, deleteComment, formattingDate } from "../../api";

import Loading from '../Loading/Loading';
import GeneralError from '../Error/GeneralError';

function CommentsByArticle({loading, setLoading, error, setError, articleId, loggedIn, setLoggedIn, comments, setComments, newComment, setNewComment}){
    const [user, setUser] = useState(null);
    const [votingError, setVotingError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [hasAlreadyVoted, setHasAlreadyVoted] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser){
            setLoggedIn(true)
            setUser(loggedInUser);
        }
    }, []);

    useEffect(() => {
        getCommentsByArticle(articleId)
        .then((res) => {
            setComments(res);
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })

    }, [articleId]);

     useEffect(() => {
        let errorTimer = null;

        if (hasAlreadyVoted !== null){
            errorTimer = setTimeout(() => {
                setHasAlreadyVoted(null);
            }, 20000); 
        }
        return () => clearTimeout(errorTimer);
    }, [hasAlreadyVoted]);

    function handleVote(commentId, voteType){
        const hasVoted = localStorage.getItem(`voted_${commentId}`) === 'true';

        if (hasVoted){
            setHasAlreadyVoted(commentId);
            return;
        };

        const voteIncrement = voteType === "+" ? 1 : -1;

        updateCommentVotesByArticle(commentId, voteIncrement)
        .then((updatedComment) => {
            const updatedComments = comments.map((comment) => {
                if(comment.comment_id === commentId){
                    const updatedCommentData = {...comment, votes: updatedComment.votes};

                    localStorage.setItem(`voted_${commentId}`, "true");
                    return updatedComment;
                };
                return comment;
            });
            setComments(updatedComments);
            setVotingError(null);
            setHasAlreadyVoted(null);
        })
        .catch((err) => {
            setVotingError(commentId)
        });
    };

    function handleDelete(commentId){
        deleteComment(commentId)
        .then(() => {
            const updatedComments = comments.filter(comment => comment.comment_id !== commentId);
            setComments(updatedComments);
            setDeleteError(null);
        })
        .catch((err)=>{
            setDeleteError(commentId);
        });
    };

    if (loading){
        return <Loading />;
    };

    if (error){
        return <GeneralError />;
    };

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
                                    <p>Created at: {formattingDate(comment.created_at)}</p>

                                        <div className="flex items-center space-x-2 mt-2">
                                            <p>Votes: {comment.votes}</p>

                                     {loggedIn ? (
                                        <>
                                        {user !== comment.author && (
                                        <>
                                            {votingError === comment.comment_id && (
                                                <div>
                                                     <p className="bg-white text-red-600 rounded-lg p-2">Error voting, please try again later.</p>
                                                </div>
                                            )}
                                            {hasAlreadyVoted === comment.comment_id && (
                                                <div>
                                                     <p className="bg-white text-red-600 rounded-lg p-2">You have already voted on this comment.</p>
                                                </div>
                                            )}
                                        <button onClick={() => handleVote(comment.comment_id, "+")} className="bg-[#BBA5E1] p-2 w-15 rounded-lg">+1</button>
                                        <button onClick={() => handleVote(comment.comment_id, "-")} className="bg-[#BBA5E1] p-2 w-15 rounded-lg">-1</button>
                                        </>
                                     )}  

                                     {user === comment.author && (
                                        <div>
                                            {deleteError === comment.comment_id && (
                                                <div>
                                                     <p className="bg-white text-red-600 rounded-lg p-2">Error deleting comment, please try again later.</p>
                                                </div>
                                            )}
                                            <button onClick={() => handleDelete(comment.comment_id)} className="bg-[#BBA5E1] p-2 w-20 rounded-lg">Delete</button>
                                        </div>
                                     )} 
                                     </>
                                    ) : ( <p>Login to Vote</p> 
                                    )}
                                    </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    );
};

export default CommentsByArticle;