import { getAllArticles } from "../../api";
import { useParams, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import Error from '../Error/Error';

function AllArticles({articles, setArticles, loading, setLoading, error, setError}){
    const { topic } = useParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    function toggleDropdown(e){
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    function handleSortChange(sortCategory, orderBy){
        setSearchParams({sort_by: sortCategory, order: orderBy})
        setIsDropdownOpen(!isDropdownOpen)
    };

    useEffect(() => {
        setLoading(true);
        getAllArticles(topic, sortBy, order)
        .then((res) => {
            console.log(res)
            setArticles(res.articles)
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })

    }, [topic, setArticles, sortBy, order])

      if (loading){
        return <Loading />
    }

    if (error){
        return <Error />
    }

    return (
        <div className="relative">

           <div className="mt-4 text-left relative bg-[#BBA5E1]">
                 <button onClick={toggleDropdown} className="bg-[#32116E] p-3 rounded-lg text-white mt-2 ml-2 mb-2 w-25">
                    Sort
                </button>
            {isDropdownOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 ml-3 z-20 space-y-1 flex flex-col">

                <button onClick={() => handleSortChange("created_at", "asc")} className="bg-[#BBA5E1] p-3 w-42 rounded-lg text-white">Date - Ascending</button>

                <button onClick={() => handleSortChange("created_at", "desc")} className="bg-[#BBA5E1] p-3 w-42 rounded-lg text-white">Date - Descending</button>

                <button onClick={() => handleSortChange("votes", "asc")} className="bg-[#BBA5E1] p-3 w-42 rounded-lg text-white">Votes - Ascending</button>

                <button onClick={() => handleSortChange("votes", "desc")} className="bg-[#BBA5E1] p-3 w-42 rounded-lg text-white">Votes - Descending</button>

            </div>
            )}
            </div>
           
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