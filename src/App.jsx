import './App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Card from './assets/components/card/Card';
import SinglePage from './assets/routes/SinglePage'; 

function Home() {
  const [data, setData] = useState([]);
  const [visibleShows, setVisibleShows] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    axios("https://api.tvmaze.com/shows")
      .then(product => setData(product.data))
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      axios("https://api.tvmaze.com/shows")
        .then(product => setData(product.data))
        .catch(error => console.error('Error fetching shows:', error));
    } else {
      axios(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
        .then(result => {
          const searchData = result.data.map(item => item.show);
          setData(searchData);
        })
        .catch(error => console.error('Error searching shows:', error));
    }
  }, [searchTerm]);

  const loadMore = () => {
    setVisibleShows(prev => prev + 8); 
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="hero">
      <div className="container">
        <div className="hero__hug">
          <div className="header__title">
            <h1>All TV shows</h1>
            <form className="search-bar">
            <input
              type="text"
              placeholder="Search shows..."
              value={searchTerm}
              onChange={handleChange}
              
            />
            <button type="submit" >Search</button>
          </form>
          </div>
          
          <div className="wrapper">
            {
              data.slice(0, visibleShows).map(film => (
                <React.Fragment key={film.id}>
                  <Card
                    id={film.id}
                    name={film.name}
                    image={film.image?.original}
                    description={film.summary}
                    premiered={film.premiered}
                    rating={film.rating?.average}
                    genres={film.genres}
                    url={film.url}
                  />
                </React.Fragment>
              ))
            }
          </div>
          {data.length > visibleShows && (
            <div className="load-more">
              <button onClick={loadMore} className="load-more-button">Show More</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/singlepage/:id" element={<SinglePage />} />
    </Routes>
  );
}

export default App;
