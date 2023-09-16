import { useParams } from 'react-router-dom';
import useAnimeInfoQuery from '../../hooks/useAnimeInfoQuery';

import './anime-info.css';

function AnimeInfo() {
  const { id } = useParams<{ id: string }>();
  const animeInfoQuery = useAnimeInfoQuery(parseInt(id!));

  if (animeInfoQuery.isLoading) {
    return <>Loading...</>;
  }

  if (animeInfoQuery.error instanceof Error) {
    return <>{animeInfoQuery.error.message}</>;
  }

  if (animeInfoQuery.isSuccess) {
    const animeInfo = animeInfoQuery.data.data.data.Media;
    return (
      <div className='anime-info-container'>
        <div className='anime-header'>
          <img src={animeInfo.coverImage.large} />
          <div className='title-description'>
            <h1>{animeInfo.title.english}</h1>
            <text dangerouslySetInnerHTML={{ __html: animeInfo.description }} />
          </div>
        </div>
        <div className='other-info'>
          <ul>
            <li>Format: {animeInfo.format}</li>
            <li>Average Score: {animeInfo.averageScore}</li>
            <li>Mean Score: {animeInfo.meanScore}</li>
            <li>Source: {animeInfo.source}</li>
            <li>Season: {animeInfo.season}</li>
            <li>Duration: {animeInfo.duration} minutes</li>
            <li>Episodes: {animeInfo.episodes}</li>
            <li>
              Start Date: {animeInfo.startDate.year}-{animeInfo.startDate.month}
              -{animeInfo.startDate.day}
            </li>
            <li>
              End Date: {animeInfo.endDate.year}-{animeInfo.endDate.month}-
              {animeInfo.endDate.day}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AnimeInfo;
