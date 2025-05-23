import { useState, useEffect, useContext } from "react";
import { postNewArticle } from "../../api";
import { getAllTopics } from "../../api";
import { ErrorContext } from "../../contexts/ErrorContext";

function AddNewArticle({loggedIn, setLoggedIn, articles, setArticles, topics, setTopics}){
    const [newArticle, setNewArticle] = useState({author: "",title: "",body: "",topic:"",article_img_url: ""});
    const [postingLoading, setPostingLoading] = useState(false);
    const [postingError, setPostingError] = useState(false);
    const {error, setError} = useContext(ErrorContext);

     useEffect(() => {
            getAllTopics()
            .then((res) => {
                setTopics(res);
            })
            .catch((err) => {
                setError(true);
            })
        }, []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser){
            setLoggedIn(true);
            setNewArticle(prev => ({
                ...prev, author: loggedInUser
            }))
        }
    }, [setLoggedIn]);

    function handleChange(e){
        const {id, value} = e.target;
        setNewArticle(prev => ({
            ...prev, [id]: value
        }))
    }

    function handleSubmit(e){
        console.log(typeof newArticle.topic)
        const loggedInUser = localStorage.getItem('loggedInUser');
        e.preventDefault();
        setPostingLoading(true);

        postNewArticle(newArticle)
        .then((newArticleData) => {
            setArticles((prevArticles) => {
                const updatedArticles = [newArticleData, ...prevArticles]
                return updatedArticles;
            })
        })
        .catch((err) => {
            setPostingError(true);
        })
        .finally(() => {
            setPostingLoading(false);
        })

    }

    return(
        <div className="max-w-md mx-auto mt-8 p-6">
            {postingError && (
                <div>
                    <p className="bg-white text-red-600 rounded-lg">Error posting article, please try again later.</p>
                </div>
                )}

            {loggedIn ? (
                <>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="article" className="block text-lg font-medium mb-2 text-white">
                            Add Article:
                        </label>
                        <input type="text" id="title" value={newArticle.title} onChange={handleChange} className="bg-white rounded-lg w-full h-10 mb-2" required placeholder="Enter Article Title"/>

                        <textarea id="body" value={newArticle.body} onChange={handleChange} className="bg-white rounded-lg w-full h-24 mb-2" required placeholder="Enter Article Body"/>

                        <select id="topic" value={newArticle.topic} onChange={handleChange} className="w-full p-2 border border-[#BBA5E1] rounded-lg bg-white mb-2">
                        <option value="" >Select a Topic</option>
                        {topics.map((topic) => {
                           return( <option value={topic.slug} key={topic.slug}>{topic.slug}</option>)
                        })}
                        </select>

                        <input type="text" id="article_img_url" value={newArticle.article_img_url} onChange={handleChange} className="bg-white rounded-lg w-full h-10" required placeholder="Enter Article Image URL"/>
                    </div>

                    <button type="submit" disabled={postingLoading} className="bg-[#BBA5E1] p-2 rounded-lg text-white">{postingLoading ? "Posting..." : "Post Article"}</button>

                </form>
                </>
            ) : (
                <h2 className="text-xl p-4 bg-white rounded-lg">Plesse login to post an Article.</h2>
            )}
        </div>
    )
    
}

export default AddNewArticle;