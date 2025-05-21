 import React from "react";
 import { Link } from "react-router-dom";
 import HomepageHeader from "./HomepageHeader";
 import RecentArticles from "./RecentArticles";
 import Profile from "./Profile";
 
 function Homepage({loading, setLoading, error, setError}){
    return (
    <div className="relative">
            <Profile />
            <HomepageHeader />
        <div className="pt-32 p-2"> 
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
            <RecentArticles loading={loading} setLoading={setLoading} error={error} setError={setError}/>
         </div>
    </div>
    )
 }

 export default Homepage;