import { Link } from "react-router-dom";
import { useState} from "react";

function Profile(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function toggleDropdown(e){
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
         <div className="mt-4 text-left relative bg-[#BBA5E1]">
            <button onClick={toggleDropdown} className="bg-[#32116E] p-3 rounded-lg text-white mt-2 ml-2 mb-2 w-25">
                Profile
            </button>

            {isDropdownOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 ml-3 mb-2 z-20 space-y-2 flex flex-col">
                <Link to="/login">
                <button className="bg-[#BBA5E1] p-3 w-25 rounded-lg text-white">Login</button>
                </Link>
                <Link to="/signup">
                <button className="bg-[#BBA5E1] p-3 w-25 rounded-lg text-white">Sign Up</button>
                </Link>
            </div>
            )}
        </div>  
    ); 
};

export default Profile;