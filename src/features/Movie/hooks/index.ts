import MovieType from '@/types/MovieType'
import { MOVIE_LIST, MOVIE_SEARCH } from '@/utils/endpoint'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetMovie = (params: Record<string, any>, current: Number) => {
  return useQuery({
    queryKey: ['getMovies', { params, current }],
    queryFn: async () => {
      const options = {
        method: 'GET',
        url: params.search ? MOVIE_SEARCH : MOVIE_LIST,
        params: {
          query: params.search,
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: current,
          sort_by: params.sort,
          with_genres: params.filter
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.ACCESS_TOKEN,
        },
      }

      const res = await axios.request(options)
      console.log(res.data)
      const formattedData: MovieType[] = res.data.results.map((movie: any) => ({
        original_title: movie.original_title || '',
        poster_path: movie.poster_path || '',
        release_date: movie.release_date || '',
        overview: movie.overview || '',
      }))

      const totalPages = res.data.total_pages

      return { data: formattedData, totalPages }
    },
  })
}

export const useGetGenre = () => {
  return useQuery({
    queryKey: ['getGenre'],
    queryFn: async () => {
      const res = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
          params: { language: 'en' },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.ACCESS_TOKEN,
          },
        }
      )
      console.log(res.data.genres)
      return res.data.genres
    },
  })
}
