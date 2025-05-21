import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getArticle, formattingString, updateArticleVotes } from '../../api';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { Link } from "react-router";
import CommentsByArticle from "../Comments/CommentsByArticle";
import AddNewComment from "../Comments/AddNewComment";


function Article({loading, setLoading, error, setError, loggedIn, setLoggedIn}){
    const { articleId } = useParams();
    const [article, setArticle] = useState({});
    const [hasVoted, setHasVoted] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser){
            setLoggedIn(true)
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        getArticle(articleId)
        .then((res) => {
            setArticle(res);
            const voted = localStorage.getItem(`voted_${articleId}`) === 'true'
            setHasVoted(voted)
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [articleId]);

    if (loading){
        return <Loading />
    }

    if (error){
        return <Error />
    }

    function handleVote(articleId, voteType){
        const hasAlreadyVoted = localStorage.getItem(`voted_${articleId}`) === 'true'
        if (hasAlreadyVoted){
            alert("You have already voted on this article.")
            return;
        }

        const voteIncrement = voteType === "+" ? 1 : -1;

        const updatedVotes = article.votes + voteIncrement;
        setArticle(prevArticle => ({
            ...prevArticle, votes: updatedVotes,
        }))

        updateArticleVotes(articleId, voteIncrement)
        .then((updatedArticle) => {
            setArticle(updatedArticle)
            localStorage.setItem(`voted_${articleId}`, 'true')
            setHasVoted(true);
        })
        .catch((err) => {
            setError(true)
            setArticle(prevArticle => ({
            ...prevArticle, votes: prevArticle.votes - voteIncrement,
        }))
        })


    }

    return (
       <div>
        <div>
            <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg fixed top-4 left-4">Home</button>
            </Link>
        </div>
        <div className="relative p-4" key={article.article_id}>
            <h3 className="text-3xl text-white p-4">{article.title}</h3>
            <h4 className="text-xl text-white p-4">By {article.author}</h4>
            <div className="bg-white p-4 rounded-lg ml-6 mr-6">
            <img src={article.article_img_url} alt={`Image for ${article.title}`} className="mx-auto w-100 p-4" />
            <p>Topic: {formattingString(article.topic)}</p>
            <p>Votes: {article.votes}</p>
            {loggedIn ? (
                     <>
                        <button onClick={() => handleVote(article.article_id, "+")} className="bg-[#BBA5E1] p-2 w-15 rounded-lg">+1</button>
                        <button onClick={() => handleVote(article.article_id, "-")} className="bg-[#BBA5E1] p-2 w-15 rounded-lg">-1</button>
                     </>
                ) : (
                    <p>Login to Vote</p>
                    )} 
            <p>Created at: {article.created_at}</p>
            <p>Comment Count: {article.comment_count}</p>
            <p className="w-[900px]">{article.body}</p>
            </div>
        </div>
            <AddNewComment loading={loading} setLoading={setLoading} error={error} setError={setError} articleId={articleId} loggedIn={loggedIn} setLoggedIn={setLoggedIn} comments={comments} setComments={setComments} newComment={newComment} setNewComment={setNewComment}/>
            <CommentsByArticle loading={loading} setLoading={setLoading} error={error} setError={setError} articleId={articleId} loggedIn={loggedIn} setLoggedIn={setLoggedIn} comments={comments} setComments={setComments} newComment={newComment} setNewComment={setNewComment}/>
            
    </div>
    )
}

export default Article