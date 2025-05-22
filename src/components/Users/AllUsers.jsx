import { getAllUsers } from "../../api";
import { useEffect} from "react";
import { Link } from "react-router";

import Loading from "../Loading/Loading";
import GeneralError from '../Error/GeneralError';

function AllUsers({users, setUsers, loading, setLoading, error, setError}){
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
            <h2 className="text-xl p-4 bg-white">All Users</h2>
            <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg top-2 left-2 absolute">Home</button>
            </Link>
            <div className="grid grid-cols-5 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-5">

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