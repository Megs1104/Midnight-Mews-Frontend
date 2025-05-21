import { getAllArticles } from "../../api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import Error from '../Error/Error';

function AllArticles({articles, setArticles, loading, setLoading, error, setError}){
    const { topic } = useParams();

    useEffect(() => {
        setLoading(true);
        getAllArticles(topic)
        .then((res) => {
            setArticles(res.articles)
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })

    }, [topic, setArticles])

      if (loading){
        return <Loading />
    }

    if (error){
        return <Error />
    }

    return (
        <div className="relative">
            <h2 className="text-xl p-4 bg-white">Articles</h2>
            <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg top-2 left-2 absolute">Home</button>
            </Link>
            <div className="grid grid-cols-5 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-5">
                {articles.map((article) => {
                   return( <div className="" key={article.article_id}>
                        <img src={article.article_img_url} alt={`Image for ${article.title}`} />
                        <h3>{article.title}</h3>
                        <h4>By {article.author}</h4>
                        <p>Topic: {article.topic}</p>
                        <Link to={`/articles/${article.article_id}`}>
                        <button className="bg-[#BBA5E1] p-2 rounded-lg">View</button>
                        </Link>
                    </div>
                )})}
            </div>
            <Link to="/articles/:article">
                <button className="bg-[#BBA5E1] p-2 rounded-lg">Next page</button>
            </Link>
        </div>
)
}

export default AllArticles;