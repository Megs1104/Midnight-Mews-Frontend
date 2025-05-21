import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from '../Error/GeneralError';
import { getAllUsers } from "../../api";

function Login({loading, setLoading, error, setError, loggedIn, setLoggedIn, users, setUsers}){
const [selectedUser, setSelectedUser] = useState("")

    useEffect(() => {
        setLoading(true);
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser){
            setSelectedUser(storedUser)
            setLoggedIn(true)
        }

        getAllUsers()
        .then((res) => {
            setUsers(res)
        })
        .catch((err) => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [setUsers, setLoading, setError, setLoggedIn])

    function handleUserChange(e){
        setSelectedUser(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(selectedUser)
        if (selectedUser){
           
           const user = users.find((user) => user.username === selectedUser);
           
           if (user){
            setLoggedIn(true);
            localStorage.setItem('loggedInUser', selectedUser);
           }
        }
    }

       if (loading){
        return <Loading />
    }

    if (error){
        return <GeneralError />

    }

    return(
        <div className="max-w-md mx-auto mt-8 p-6">
            <h2 className="text-xl p-4 bg-white rounded-lg">Login</h2>
            
            {loggedIn && (
                <div className="p-4 bg-white text-center text-green-500 rounded-lg mb-4 mt-4">
                    <h2 className="text-lg">You are now logged in as {selectedUser}!</h2>
                <Link to="/">
                    <button className="bg-[#BBA5E1] text-white p-2 rounded-lg top-2 left-2 absolute">Return Home</button>
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
    )
}

export default Login;