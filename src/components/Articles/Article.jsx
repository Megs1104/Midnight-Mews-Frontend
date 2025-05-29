import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import { getArticle, formattingString, updateArticleVotes, formattingDate, deleteArticle, getAllArticles } from '../../api';
import { Link } from "react-router";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import Loading from '../Loading/Loading';
import NotFoundError from '../Error/NotFoundError';
import CommentsByArticle from "../Comments/CommentsByArticle";
import AddNewComment from "../Comments/AddNewComment";

function Article({loggedIn, setLoggedIn, articles, setArticles}){
    const { articleId } = useParams();
    const {loading, setLoading} = useContext(LoadingContext);
    const {error, setError} = useContext(ErrorContext);
    const [article, setArticle] = useState({});
    const [hasVoted, setHasVoted] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [votingError, setVotingError] = useState(null);
    const [hasAlreadyVoted, setHasAlreadyVoted] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [deleted, setDeleted] = useState(false);

    const navigate = useNavigate();

    const loggedInUser = localStorage.getItem('loggedInUser');

     useEffect(() => {
            setLoading(true);
            getAllArticles()
            .then((res) => {
                setArticles(res.articles);
            })
            .catch((err) => {
                setError(true);
            })
    
        }, []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser){
            setLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        setError(false)
        setLoading(true)
        getArticle(articleId)
        .then((res) => {
            setArticle(res);
            const voted = localStorage.getItem(`voted_${articleId}`) === 'true';
            setHasVoted(voted);
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

    function handleVote(articleId, voteType){
        const hasVoted = localStorage.getItem(`voted_${articleId}`) === 'true';
        if (hasVoted){
            setHasAlreadyVoted(articleId)
            return;
        };

        const voteIncrement = voteType === "+" ? 1 : -1;

        const updatedVotes = article.votes + voteIncrement;
        setArticle(prevArticle => ({
            ...prevArticle, votes: updatedVotes,
        }));

        updateArticleVotes(articleId, voteIncrement)
        .then((updatedArticle) => {
            setArticle(updatedArticle);
            localStorage.setItem(`voted_${articleId}`, 'true');
            setHasVoted(true);
        })
        .catch((err) => {
            setVotingError(articleId);
            setArticle(prevArticle => ({
            ...prevArticle, votes: prevArticle.votes - voteIncrement,
        }));
        });
    };

    function handleDelete(articleId){
            deleteArticle(articleId)
            .then(() => {
                setDeleteError(null);
                setDeleted(true);
            })
            .catch((err)=>{
                console.log(err)
                setDeleteError(articleId);
            })
        };

     if (loading){
        return <Loading />;
    };

    if (error){
        return <NotFoundError />;
    };


    return (
       <div>
        {!deleted && (
            <>
            <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg fixed top-4">Home</button>
            </Link> 
            <div className="relative p-4" key={article.article_id}>
                <h3 className="text-3xl text-white p-4">{article.title}</h3>
                <h4 className="text-xl text-white p-4">By {article.author}</h4>
                <div className="bg-white p-4 rounded-lg ml-6 mr-6">
                <img src={article.article_img_url} alt={`Image for ${article.title}`} className="mx-auto w-100 p-4" />
                <p>Topic: {formattingString(article.topic)}</p>
                <p>Votes: {article.votes}</p>
            
            {loggedIn ? (
                <>
                    {loggedInUser !== article.author && (
                        <>
                        {votingError && (
                            <div>
                                <p className="bg-white text-red-600 rounded-lg p-2">Error voting, please try again later.</p>
                            </div>
                        )}
                        {hasAlreadyVoted && (
                            <div>
                                <p className="bg-white text-red-600 rounded-lg p-2">You have already voted on this article.</p>
                            </div>
                        )}

                        <button onClick={() => handleVote(article.article_id, "+")} className="bg-[#BBA5E1] p-2 w-15 rounded-lg">+1</button>
                        <button onClick={() => handleVote(article.article_id, "-")} className="bg-[#BBA5E1] p-2 w-15 rounded-lg ml-2">-1</button>
                        </>
                    )}

                    {loggedInUser === article.author && (
                             <>
                                {deleteError === article.article_id && (
                                    <div>
                                         <p className="bg-white text-red-600 rounded-lg p-2">Error deleting article, please try again later.</p>
                                    </div>
                                )}
                                 <button onClick={() => handleDelete(article.article_id)} className="bg-[#BBA5E1] p-2 w-20 rounded-lg">Delete</button>
                             </>
                            )} 
                    </>
                     ): (
                        <p>Login to Vote</p>
                    )}
                        
                <p>Created at: {formattingDate(article.created_at)}</p>
                <p>Comment Count: {article.comment_count}</p>
                <p>{article.body}</p>
            </div>
        </div>
        
            <AddNewComment articleId={articleId} loggedIn={loggedIn} setLoggedIn={setLoggedIn} comments={comments} setComments={setComments} newComment={newComment} setNewComment={setNewComment}/>
            <CommentsByArticle loading={loading} setLoading={setLoading} error={error} setError={setError} articleId={articleId} loggedIn={loggedIn} setLoggedIn={setLoggedIn} comments={comments} setComments={setComments} newComment={newComment} setNewComment={setNewComment}/>
        </>
        )}

        {deleted && (
        <div>
            <p className="text-white rounded-lg p-2">Article Successfully Deleted.</p>
            <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg fixed top-4"> Go Home</button>
            </Link>    
        </div>
        )}
            
    </div>
    )
}

export default Article;