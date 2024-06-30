import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

function Card({ id, name, image, description, premiered, rating, genres, url }) {
  return (
    <div className="card">
      <div className="card__img">
        <Link to={`/singlepage/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className="card__content">
        <h2>{name}</h2>
        <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div>
        <div className="info">
          <div className="details">
            <p><strong>Premiered:</strong> <span>{premiered}</span></p>
            <p><strong>Rating:</strong> <span>{rating}</span></p>
            <p><strong>Genres:</strong> <span>{genres.join(', ')}</span></p>
          </div>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="watch">More Info</a>
      </div>
    </div>
  );
}

export default Card;
