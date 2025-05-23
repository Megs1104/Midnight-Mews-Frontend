import { getAllTopics, formattingString } from "../../api";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import Loading from "../Loading/Loading";
import GeneralError from "../Error/GeneralError";

function AllTopics(){
    const {loading, setLoading} = useContext(LoadingContext);
    const {error, setError} = useContext(ErrorContext);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
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
            <h2 className="text-xl p-4 bg-white">Topics</h2>
            <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg top-2 left-2 absolute">Home</button>
            </Link>
            <div className="grid grid-cols-5 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-5">

                {topics.map((topic) => {
                   return( 
                   <div className="bg-[#BBA5E1] rounded-lg p-2 shadow-lg" key={topic.slug}>
                    <div className="flex flex-col items-center justify-center p-4">
                        <h3 className="text-xl text-white">{formattingString(topic.slug)}</h3>
                        <h4 className="text-l text-white">{topic.description}</h4>

                        <Link to={`/articles/${topic.slug}`}>
                        <button className="bg-[#32116E] text-white p-2 rounded-lg">View</button>
                        </Link>
                    </div>
                   </div>
                )})}
            </div>
        </div>
    );
};

export default AllTopics;