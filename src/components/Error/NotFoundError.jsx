import { Link } from "react-router";

function NotFoundError(){
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-45 h-45 bg-white rounded-full flex justify-center items-center">
            <img src="/errorLogo.jpeg" alt="Purple cat crying" className="w-32 h-32"/>
         </div>
         <h2 className="mt-6 text-white text-xl">Error: Article Not Found</h2>
         <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg fixed mt-4">Go Home</button>
            </Link>
        </div>
        
    );
};

export default NotFoundError;