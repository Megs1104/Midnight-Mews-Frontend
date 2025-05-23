import { getAllUsers } from "../../api";
import { useEffect, useContext} from "react";
import { Link } from "react-router";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import Loading from "../Loading/Loading";
import GeneralError from '../Error/GeneralError';

function AllUsers({users, setUsers}){
    const {loading, setLoading} = useContext(LoadingContext);
    const {error, setError} = useContext(ErrorContext)
    useEffect(() => {
        setLoading(true);
        getAllUsers()
        .then((res) => {
            setUsers(res);
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [setUsers]);

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
            <h2 className="text-xl p-4 bg-white">All Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6 p-5">

                {users.map((user) => {
                   return( <div className="bg-[#BBA5E1] rounded-lg p-2 shadow-lg" key={user.username}>
                    <div className="flex flex-col items-center justify-center p-4">
                        <img src={user.avatar_url} alt={`Avatar for ${user.username}`} className="w-32 h-32 object-contain rounded-lg bg-white"/>
                    </div>
                        <h3 className="text-xl text-white">{user.username}</h3>
                        <Link to={`/users/${user.username}`}>
                        <button className="bg-white p-2 rounded-lg">View</button>
                        </Link>
                    </div>
                )})}
            </div>
        </div>
    );
};

export default AllUsers;