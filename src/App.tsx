import useTopAnimeQuery from './hooks/useTopAnimeQuery';

import AnimeListItem from './components/AnimeListItem';

import './App.css';

function App() {
  const topAnimeQuery = useTopAnimeQuery();

  if (topAnimeQuery.isLoading) {
    return <>Loading...</>;
  }

  if (topAnimeQuery.error instanceof Error) {
    return <>{topAnimeQuery.error.message}</>;
  }

  if (topAnimeQuery.isSuccess) {
    const topAnimeData = topAnimeQuery.data.data;
    const animeList = topAnimeData.data.Page.media;
    return (
      <>
        <h1>Top Anime</h1>
        <ol className='list-container'>
          {animeList.map((anime) => (
            <li key={anime.id}>
              <AnimeListItem animeDetails={anime} />
            </li>
          ))}
        </ol>
      </>
    );
  }
}

export default App;
