import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';

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
import PathNotFoundError from './components/Error/PathNotFoundError';

import { LoadingProvider } from './contexts/LoadingContext';
import { ErrorProvider } from './contexts/ErrorContext';
import AddNewArticle from './components/Articles/AddNewArticle';

function App() {
const [articles, setArticles] = useState([]);
const [topics, setTopics] = useState([]);
const [users, setUsers] = useState([]);
const [loggedIn, setLoggedIn] = useState(false);

  return (
      <div className="bg-gradient-to-b from-[#32116e] to-[#bba5e1] bg-cover bg-center min-h-screen">
        <LoadingProvider>
        <ErrorProvider>
          <Routes>
            <Route path="/" element={
              <div>
                <Homepage articles={articles}/>
              </div>} />

            <Route path="/articles/:topic?" element={<AllArticles articles={articles} setArticles={setArticles}/>} />

            <Route path="/articles/article/:articleId" element={<Article loggedIn={loggedIn} setLoggedIn={setLoggedIn} rticles={articles} setArticles={setArticles}/>} />

            <Route path="/articles/article/:articleId/comments" element={<CommentsByArticle loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>

            <Route path="/users" element={<AllUsers users={users} setUsers={setUsers}/>} />

            <Route path="/users/:username" element={<User loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />

            <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} users={users} setUsers={setUsers} />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/topics" element={<AllTopics topics={topics} setTopics={setTopics} />} />
          
            <Route path="*" element={<PathNotFoundError />} />

            <Route path="/articles/post" element={<AddNewArticle loggedIn={loggedIn} setLoggedIn={setLoggedIn} articles={articles} setArticles={setArticles} topics={topics} setTopics={setTopics}/>} />

          </Routes>
        </ErrorProvider>
        </LoadingProvider>
      
    </div>
  )
}

export default App;
