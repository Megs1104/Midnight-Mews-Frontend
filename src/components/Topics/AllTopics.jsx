import { getAllTopics, formattingString } from "../../api";
import { useEffect, useContext } from "react";
import { Link } from "react-router";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import Loading from "../Loading/Loading";
import GeneralError from "../Error/GeneralError";

function AllTopics({topics, setTopics}){
    const {loading, setLoading} = useContext(LoadingContext);
    const {error, setError} = useContext(ErrorContext);

    useEffect(() => {
        setError(false)
        setLoading(true);
        getAllTopics()
        .then((res) => {
            setTopics(res);
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [setTopics]);

    if (loading){
        return <Loading />;
    };

    if (error){
        return <GeneralError />;
    };

    return (
        <div className="relative">
             <div className="mt-4 text-left relative bg-[#BBA5E1]">
                <Link to="/">
                    <button className="bg-[#32116E] p-3 rounded-lg text-white mt-2 ml-2 mb-2 w-25">Home</button>
                </Link>
            </div>
            <h2 className="text-xl p-4 bg-white">Topics</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 p-5 justify-items-center">

                {topics.map((topic) => {
                   return( 
                   <div className="bg-[#BBA5E1] rounded-lg p-2 shadow-lg w-80" key={topic.slug}>
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 text-left mt-3">
                            <h3 className="text-xl text-white">{formattingString(topic.slug)}</h3>
                            <h4 className="text-l text-white">{topic.description}</h4>
                        </div>

                        <div className="ml-4 mt-5">
                            <Link to={`/articles/${topic.slug}`}>
                            <button className="bg-[#32116E] text-white p-2 rounded-lg">View</button>
                            </Link>

                        </div>
                    </div>
                   </div>
                )})}
            </div>
        </div>
    );
};

export default AllTopics;