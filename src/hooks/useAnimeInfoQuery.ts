import axios from 'axios';
import { useQuery } from 'react-query';

interface AnimeInfo {
  data: {
    Media: {
      id: number;
      source: string;
      meanScore: number;
      format: string;
      episodes: number;
      duration: number;
      genres: string[];
      status: string;
      popularity: number;
      startDate: {
        day: number;
        month: number;
        year: number;
      };
      endDate: {
        day: number;
        month: number;
        year: number;
      };
      season: string;
      title: {
        romaji: string;
        english: string;
        native: string;
      };
      averageScore: number;
      bannerImage: string;
      coverImage: {
        large: string;
      };
      description: string;
    };
  };
}

function fetchAnimeInfo(id: number) {
  const graphqlQuery = `
    query ($id: Int) { 
      Media (id: $id, type: ANIME) {
        id
        source
        meanScore
        format
        episodes
        duration
        genres
        status
        popularity
        startDate {
            day
            month
            year
        }
        endDate {
            day
            month
            year
        }
        season
        title {
          romaji
          english
          native
        }
        averageScore
        bannerImage
        coverImage {
          large
        }
        description(asHtml: false)        
      }
    }
  `;

  const variables = {
    id: id,
  };

  return axios.post<AnimeInfo>('https://graphql.anilist.co', {
    query: graphqlQuery,
    variables: variables,
  });
}

function useAnimeInfoQuery(id: number) {
  return useQuery(['anime', id], () => fetchAnimeInfo(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export default useAnimeInfoQuery;
