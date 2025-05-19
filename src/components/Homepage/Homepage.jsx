 import React from "react";
 import { Link } from "react-router-dom";
 import HomepageHeader from "./HomepageHeader";
 import RecentArticles from "./RecentArticles";
 
 function Homepage({loading, setLoading, error, setError}){
    return (
    <div className="relative">
            <HomepageHeader />
        <div className="pt-32"> 
            <div className="bg-[#BBA5E1] p-4 rounded-lg w-full mt-2">
            <Link to="/articles">
                <button className="bg-white p-3 rounded-lg">All Articles</button>
            </Link>
             </div>
         </div>
         <div>
            <RecentArticles loading={loading} setLoading={setLoading} error={error} setError={setError}/>
         </div>
    </div>
    )
 }

 export default Homepage;