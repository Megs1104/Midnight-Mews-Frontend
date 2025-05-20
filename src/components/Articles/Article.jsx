import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getArticle, formattingString } from '../../api';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { Link } from "react-router";
import CommentsByArticle from "../Comments/CommentsByArticle";


function Article({loading, setLoading, error, setError, loggedIn, setLoggedIn}){
    const { articleId } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        setLoading(true);
        getArticle(articleId)
        .then((res) => {
            setArticle(res);
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
            <p>Created at: {article.created_at}</p>
            <p>Comment Count: {article.comment_count}</p>
            <p className="w-[900px]">{article.body}</p>
            </div>
        </div>
            <CommentsByArticle loading={loading} setLoading={setLoading} error={error} setError={setError} articleId={articleId} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            
    </div>
    )
}

export default Article