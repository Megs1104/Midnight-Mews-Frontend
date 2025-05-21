import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import axios from 'axios';

import './App.css'
import Homepage from './components/Homepage/Homepage';
import AllArticles from './components/Articles/AllArticles';
import Article from './components/Articles/Article';
import CommentsByArticle from './components/Comments/CommentsByArticle';
import AllUsers from './components/Users/AllUsers';
import User from './components/Users/User';
import Login from './components/Users/Login';
import Profile from './components/Homepage/Profile';
import AllTopics from './components/Topics/AllTopics';

function App() {
const [articles, setArticles] = useState([]);
const [users, setUsers] = useState([]);
const [loggedIn, setLoggedIn] = useState(false);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

  return (
      <div className="bg-gradient-to-b from-[#32116e] to-[#bba5e1] bg-cover bg-center min-h-screen">
      <Routes>
        <Route path="/" element={
          <div>
            <Homepage loading={loading} setLoading={setLoading} error={error} setError={setError}/>
          </div>} />

        <Route path="/articles/:topic?" element={<AllArticles articles={articles} setArticles={setArticles} loading={loading} setLoading={setLoading} error={error} setError={setError}/>} />

        <Route path="/articles/:articleId" element={<Article loading={loading} setLoading={setLoading} error={error} setError={setError} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />

        <Route path="/articles/:articleId/comments" element={<CommentsByArticle />}/>

        <Route path="/users" element={<AllUsers users={users} setUsers={setUsers} loading={loading} setLoading={setLoading} error={error} setError={setError}/>} />

        <Route path="/users/:username" element={<User loading={loading} setLoading={setLoading} error={error} setError={setError}/>} />

        <Route path="/login" element={<Login loading={loading} setLoading={setLoading} error={error} setError={setError} loggedIn={loggedIn} setLoggedIn={setLoggedIn} users={users} setUsers={setUsers} />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/topics" element={<AllTopics loading={loading} setLoading={setLoading} error={error} setError={setError}/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App
