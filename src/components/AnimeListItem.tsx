import { Link } from 'react-router-dom';
import { AnimeList } from '../interfaces/anime-list';

import './anime-list-item.css';

function AnimeListItem({ animeDetails }: { animeDetails: AnimeList }) {
  return (
    <div className='list-item-container'>
      <div className='picture-container'>
        <img src={animeDetails.coverImage.medium} />
      </div>
      <div className='info-container'>
        <Link to={`/anime/${animeDetails.id}`}>
          <h3>{animeDetails.title.english}</h3>
        </Link>
        <h5>{animeDetails.seasonYear}</h5>
      </div>
    </div>
  );
}

export default AnimeListItem;
