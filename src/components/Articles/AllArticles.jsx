import { getAllArticles } from "../../api";
import { useParams, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import NotFoundError from '../Error/NotFoundError';

function AllArticles({articles, setArticles, loading, setLoading, error, setError}){
    const { topic } = useParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(1);
    const articlesPerPage = 10;


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
        getAllArticles(topic, sortBy, order, page, articlesPerPage)
        .then((res) => {
            console.log(res)
            setArticles(res.articles)
            setTotalArticles(res.total_count)

        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })

    }, [topic, setArticles, sortBy, order, page])

      if (loading){
        return <Loading />
    }

    if (error){
        return <NotFoundError />
    }

    const totalPages = Math.ceil(totalArticles /articlesPerPage);

    function handleNextPage(){
        if (page < totalPages){
            setPage(prevPage => prevPage + 1)
        }
    }

    function handlePreviousPage(){
        if (page > 1){
            setPage(prevPage => prevPage -1)
        }
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
                        <Link to={`/articles/article/${article.article_id}`}>
                        <button className="bg-[#BBA5E1] p-2 rounded-lg">View</button>
                        </Link>
                    </div>
                )})}
            </div>
            <div className="mt-3">
                <button onClick={handlePreviousPage} className="bg-[#BBA5E1] p-2 rounded-lg" disabled={page === 1}>Previous page</button>
                <button onClick={handleNextPage} className="bg-[#BBA5E1] p-2 rounded-lg ml-4" disabled={page === totalPages}>Next page</button>
            </div>
        </div>
)
}

export default AllArticles;