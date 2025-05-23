import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import HomepageHeader from "./HomepageHeader";
import RecentArticles from "./RecentArticles";
import Profile from "./Profile";
import HomepageFooter from "./HomepageFooter";
import PostArticleButton from "./PostArticleButton";
 
 function Homepage({articles}){
    const {loading, setLoading} = useContext(LoadingContext);
    const {error, setError} = useContext(ErrorContext);

    useEffect(() => {
        setError(false);
    }, [setError]);
    
    return (
    <div className="relative">
        <div className="mt-4 flex justify-between bg-[#BBA5E1] p-4">
         <Profile />
        <PostArticleButton />   
        </div>
            <HomepageHeader />
        <div className="p-2"> 
            <div className="bg-[#BBA5E1] p-4 rounded-lg w-full mt-2">
            <Link to="/articles">
                <button className="bg-white p-3 rounded-lg">Articles</button>
            </Link>
            <Link to="/users">
                <button className="bg-white p-3 ml-4 rounded-lg">Users</button>
            </Link>
            <Link to="/topics">
                <button className="bg-white p-3 ml-4 rounded-lg">Topics</button>
            </Link>
             </div>
         </div>
         <div>
            <RecentArticles articles={articles}/>
            <HomepageFooter />
         </div>
    </div>
    );
 };

 export default Homepage;