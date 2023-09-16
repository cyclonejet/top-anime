import { useQuery } from 'react-query';
import axios from 'axios';

import { AnimeList } from '../interfaces/anime-list';

interface TopAnime {
  data: {
    Page: {
      media: AnimeList[];
      pageInfo: {
        currentPage: number;
        hasNextPage: boolean;
        lastPage: number;
        perPage: number;
        total: number;
      };
    };
  };
}

function getTopAnime() {
  const graphqlQuery = `query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (type: ANIME, sort: SCORE_DESC) {
        id
        title {
          english
        }
        averageScore
        seasonYear
        coverImage {
          medium
        }
      }
    }
  }`;

  const variables = {
    perPage: 20,
    page: 1,
  };

  return axios.post<TopAnime>('https://graphql.anilist.co', {
    query: graphqlQuery,
    variables: variables,
  });
}

function useTopAnimeQuery() {
  return useQuery('top', getTopAnime);
}

export default useTopAnimeQuery;
