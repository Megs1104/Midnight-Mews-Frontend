import { Link } from "react-router-dom";

function PostArticleButton(){
    return (
            <div className="text-right mt-2">
                <Link to="/articles/post">
                <button className="bg-[#32116E] p-3 rounded-lg text-white w-35">Post an Article</button>
                </Link>
            </div>
)};

export default PostArticleButton;