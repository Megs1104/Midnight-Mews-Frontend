import { getUser } from "../../api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import PathNotFoundError from '../Error/PathNotFoundError';

function User({loading, setLoading, error, setError, loggedIn, setLoggedIn}){
    const { username } = useParams();
    const [user, setUser] = useState({});

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
    }, [user])

    if (loading){
        return <Loading />
    }

    if (error){
        return <PathNotFoundError/>
    }
 return (
       <div>
        <div>
            <Link to="/">
            <button className="bg-[#BBA5E1] p-2 rounded-lg fixed top-4 left-4">Home</button>
            </Link>
        </div>
        <div className="relative p-4" key={user.username}>
            <h3 className="text-3xl text-white p-4">{user.username}</h3>
            <div className="bg-white p-4 rounded-lg ml-6 mr-6">
            <img src={user.avatar_url} alt={`Avatar for ${user.username}`} className="mx-auto w-100 p-4" />
            </div>
        </div>
    </div>
    )

}

export default User;