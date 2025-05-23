import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../api";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import Loading from "../Loading/Loading";
import GeneralError from '../Error/GeneralError';

function Login({loggedIn, setLoggedIn, users, setUsers}){
const [selectedUser, setSelectedUser] = useState("");
const {loading, setLoading} = useContext(LoadingContext);
const {error, setError} = useContext(ErrorContext);

    useEffect(() => {
        setLoading(true);
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser){
            setSelectedUser(storedUser);
            setLoggedIn(true);
        }
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
    }, [setUsers, setLoading, setError, setLoggedIn]);

    function handleUserChange(e){
        setSelectedUser(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if (selectedUser){
           const user = users.find((user) => user.username === selectedUser);
           
           if (user){
            setLoggedIn(true);
            localStorage.setItem('loggedInUser', selectedUser);
           };
        };
    };

    if (loading){
        return <Loading />;
    };

    if (error){
        return <GeneralError />;
    };

    return(
        <div className="max-w-md mx-auto mt-8 p-6">
            <h2 className="text-xl p-4 bg-white rounded-lg">Login</h2>
            
            {loggedIn && (
                <div className="p-4 bg-white text-center text-green-500 rounded-lg mb-4 mt-4">
                    <h2 className="text-lg">You are now logged in as {selectedUser}!</h2>
                <Link to={`/users/${selectedUser}`}>
                    <button className="bg-[#BBA5E1] text-white p-2 rounded-lg top-2 left-2 absolute">View Profile</button>
                 </Link>
                 <Link to={`/`}>
                    <button className="bg-[#BBA5E1] text-white p-2 rounded-lg top-2 left-2 absolute ml-2">Home</button>
                 </Link>
                </div>
                
            )}

            {!loggedIn && (<form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="user" className="block text-lg font-medium mb-2 text-white">
                        Selected User:
                    </label>
                    <select id="user" value={selectedUser} onChange={handleUserChange} className="w-full p-2 border border-[#BBA5E1] rounded-lg bg-white">
                    <option value="">Select a User</option>
                    {users.map((user) => (
                        <option value={user.username} key={user.username}>
                            {user.username}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <button type="submit" className="bg-[#BBA5E1] p-3 w-20 rounded-lg text-white">
                        Login
                    </button>
                </div>
            </form>)}
        </div>
    );
};

export default Login;