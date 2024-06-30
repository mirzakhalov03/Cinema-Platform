import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SinglePage.scss';

function SinglePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios(`https://api.tvmaze.com/shows/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-page">
      <img src={data.image.original} alt={data.name} />
      <div className='details'>
        <h1>{data.name}</h1>
        <p dangerouslySetInnerHTML={{ __html: data.summary }}></p>
        <p><strong>Premiered:</strong> {data.premiered}</p>
        <p><strong>Rating:</strong> {data.rating.average}</p>
        <p><strong>Genres:</strong> {data.genres.join(', ')}</p>
        <a href={data.url} target="_blank" rel="noopener noreferrer">More Info</a>
      </div>
    </div>
  );
}

export default SinglePage;

