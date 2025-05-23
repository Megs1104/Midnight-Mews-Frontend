import { getAllArticles } from "../../api";
import { useParams, useSearchParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import NotFoundError from '../Error/NotFoundError';
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

function AllArticles({articles, setArticles}){
    const {loading, setLoading} = useContext(LoadingContext);
    const {error, setError} = useContext(ErrorContext);
    const { topic } = useParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(1);
    const articlesPerPage = 10;

    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    const totalPages = Math.ceil(totalArticles /articlesPerPage);

    function toggleDropdown(e){
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    function handleSortChange(sortCategory, orderBy){
        setSearchParams({sort_by: sortCategory, order: orderBy});
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        setLoading(true);
        getAllArticles(topic, sortBy, order, page, articlesPerPage)
        .then((res) => {
            setArticles(res.articles);
            setTotalArticles(res.total_count);
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [topic, sortBy, order, page]);

    function handleNextPage(){
        if (page < totalPages){
            setPage(prevPage => prevPage + 1);
        };
    };

    function handlePreviousPage(){
        if (page > 1){
            setPage(prevPage => prevPage -1);
        };
    };

    if (loading){
        return <Loading />;
    };

    if (error){
        return <NotFoundError />;
    };

    return (
        <div className="relative">
            <div className="mt-4 text-left relative bg-[#BBA5E1]">
                <Link to="/">
                    <button className="bg-[#32116E] p-3 rounded-lg text-white mt-2 ml-2 mb-2 w-25">Home</button>
                </Link>
            </div>

            <div className="relative">
                <h2 className="text-xl p-4 bg-white">Articles</h2>
                <div className="text-left">
                     <button onClick={toggleDropdown} className="bg-[#BBA5E1] p-3 rounded-lg text-white mt-2 ml-2 w-25">
                     Sort
                    </button>
                </div>

                    {isDropdownOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 ml-3 z-20 space-y-1 flex flex-col">

                        <button onClick={() => handleSortChange("created_at", "asc")} className="bg-[#BBA5E1] p-3 w-42 rounded-lg text-white">Date - Ascending</button>

                        <button onClick={() => handleSortChange("created_at", "desc")} className="bg-[#BBA5E1] p-3 w-42 rounded-lg text-white">Date - Descending</button>

                        <button onClick={() => handleSortChange("votes", "asc")} className="bg-[#BBA5E1] p-3 w-42 rounded-lg text-white">Votes - Ascending</button>

                        <button onClick={() => handleSortChange("votes", "desc")} className="bg-[#BBA5E1] p-3 w-42 rounded-lg text-white">Votes - Descending</button>

                    </div>
                    )}
                    </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-5">
                         {articles.map((article) => {
                            return( <div className="bg-white rounded-lg p-2 flex flex-col justify-between h-full" key={article.article_id}>
                            <img src={article.article_img_url} alt={`Image for ${article.title}`} />
                            <h3>{article.title}</h3>
                            <h4>Author: {article.author}</h4>
                            <p>Topic: {article.topic}</p>
                            <div className="mt-auto">
                            <Link to={`/articles/article/${article.article_id}`}>
                            <button className="bg-[#BBA5E1] p-2 rounded-lg mt-2">View</button>
                            </Link>
                            </div>
                        </div>
                    )})}
                </div>
                    <div>
                        <button onClick={handlePreviousPage} className="bg-[#BBA5E1] p-2 rounded-lg" disabled={page === 1}>Previous page</button>
                        <button onClick={handleNextPage} className="bg-[#BBA5E1] p-2 rounded-lg ml-4" disabled={page === totalPages}>Next page</button>
                    </div>
        </div>
    );
};

export default AllArticles;