import { getRecentArticles} from "../../api";
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Link } from "react-router";

function RecentArticles({loading, setLoading, error, setError}){
const [recentArticles, setrecentArticles] = useState([]);
    useEffect(() => {
        setLoading(true);
        getRecentArticles()
        .then((res) => {
            const recentFiveArticles = res.articles.slice(0,5)
            setrecentArticles(recentFiveArticles)
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })

    }, [setrecentArticles])

    if (loading){
        return Loading();
    }

    if (error){
        return Error()
    }

    return (
        <div className="relative">
            <h2 className="text-xl p-4 bg-white">Recent Articles</h2>
            <div className="grid grid-cols-1 gap-6 p-5">
                <table className="bg-white rounded-lg">
                    <tbody>
                        {recentArticles.map((article) => {
                            return(
                                <tr key={article.article_id}>
                                    <td className="p-4 text-center">
                                        <img src={article.article_img_url} alt={`Image for ${article.title}`} className="w-32 h-32 object-cover mx-auto
                                        "/>
                                    </td>
                                    <td className="p-4">
                                    <h3>{article.title}</h3>
                                    <h4>By {article.author}</h4>
                                    <p>Topic: {article.topic}</p>
                                    <Link to={`/articles/${article.article_id}`}>
                                    <button className="bg-[#BBA5E1] p-2 rounded-lg">View</button>
                                    </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentArticles;