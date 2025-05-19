import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import axios from 'axios';

import './App.css'
import Homepage from './components/Homepage/Homepage';
import AllArticles from './components/Articles/AllArticles';
import Article from './components/Articles/Article';

function App() {
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

  return (
      <div className="bg-gradient-to-b from-[#32116e] to-[#bba5e1] bg-cover bg-center min-h-screen">
      <Routes>
        <Route path="/" element={
          <div>
            <Homepage loading={loading} setLoading={setLoading} error={error} setError={setError}/>
          </div>} />
        <Route path="/articles" element={<AllArticles articles={articles} setArticles={setArticles} loading={loading} setLoading={setLoading} error={error} setError={setError}/>} />
        <Route path="/articles/:articleId" element={<Article loading={loading} setLoading={setLoading} error={error} setError={setError}/>} />
      </Routes>
      
    </div>
  )
}

export default App
