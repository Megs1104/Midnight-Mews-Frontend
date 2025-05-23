import { getUser } from "../../api";
import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import Loading from "../Loading/Loading";
import PathNotFoundError from '../Error/PathNotFoundError';

function User({loggedIn, setLoggedIn}){
    const { username } = useParams();
    const [user, setUser] = useState({});
    const {loading, setLoading} = useContext(LoadingContext);
    const {error, setError} = useContext(ErrorContext);

     useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser){
            setLoggedIn(true)
            setUser(loggedInUser);
        }
    }, []);

    useEffect(() => {
        getUser(username)
        .then((res) => {
            setUser(res);
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [user]);

    if (loading){
        return <Loading />;
    };

    if (error){
        return <PathNotFoundError/>;
    };

    return (
       <div>
        <div>
            <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg fixed top-4 left-4">Home</button>
            </Link>
        </div>
        <div className="relative p-4" key={user.username}>
            <div className="bg-white p-4 rounded-lg ml-6 mr-6 mt-4">
                <img src={user.avatar_url} alt={`Avatar for ${user.username}`} className="mx-auto w-100 p-4" />
            </div>
            <h3 className="text-3xl text-white mt-2">Username: {user.username}</h3>
        </div>

        {loggedIn && (
            <h3 className="text-3xl text-white">Name: {user.name}</h3>
        )}
    </div>
    );
};

export default User;