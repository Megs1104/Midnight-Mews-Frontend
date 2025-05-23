import { getRecentArticles} from "../../api";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import Loading from "../Loading/Loading";
import GeneralError from "../Error/GeneralError";

function RecentArticles(){
const [recentArticles, setrecentArticles] = useState([]);
const {loading, setLoading} = useContext(LoadingContext);
const {error, setError} = useContext(ErrorContext)

    useEffect(() => {
        setLoading(true);
        getRecentArticles()
        .then((res) => {
            const recentFiveArticles = res.articles.slice(0,5);
            setrecentArticles(recentFiveArticles);
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [setrecentArticles]);

     if (loading){
        return <Loading />;
    };

    if (error){
        return <GeneralError />;
    };

    return (
        <div className="relative">
            <h2 className="text-xl p-4 bg-white mt-1 w-50 rounded-lg mx-auto">Recent Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-5">
                        {recentArticles.map((article) => {
                            return(
                             <div className="bg-white rounded-lg p-2 flex flex-col justify-between h-full" key={article.article_id}>
                                <img className="w-40 mx-auto p-2" src={article.article_img_url} alt={`Image for ${article.title}`} />
                                <h3>{article.title}</h3>
                                <h4>Author: {article.author}</h4>
                                <p>Topic: {article.topic}</p>
                            <div className="mt-auto">
                                <Link to={`/articles/article/${article.article_id}`}>
                                <button className="bg-[#BBA5E1] p-2 rounded-lg mt-2">View</button>
                                </Link>
                            </div>
                        </div>
                            )
                        })}
            
            </div>
        </div>
    );
};

export default RecentArticles;